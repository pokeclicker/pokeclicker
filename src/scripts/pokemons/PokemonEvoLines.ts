///<reference path="../../declarations/requirements/MegaEvolveRequirement.d.ts"/>
class PokemonEvoLines {
    public static findBaseStage(pokemon: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.MAX_AVAILABLE_REGION, passDummy = false): PokemonNameType {
        const baby = pokemonBabyPrevolutionMap[pokemon];
        const evo = !passDummy ? PokemonEvoLineageType.Evolution : PokemonEvoLineageType.EvolutionIncludingDummy;
        if (!baby || PokemonHelper.calcNativeRegion(baby) > maxRegion) {
            let p = pokemon;
            // written this way because some pokemon evolve into forms that evolve into themselves again
            while (PokemonLocations.getEvoLineage(p, maxRegion)[evo]?.some(e => !PokemonLocations.getEvoLineage(e.basePokemon, maxRegion)[evo]?.some(ev => ev.basePokemon === p))) {
                p = PokemonLocations.getEvoLineage(p, maxRegion)[evo]?.find(e => !PokemonLocations.getEvoLineage(e.basePokemon, maxRegion)[evo]?.some(ev => ev.basePokemon === p)).basePokemon;
            }
            return p;
        } else {
            return baby;
        }
    }

    public static getEvoLine(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.MAX_AVAILABLE_REGION, followDummy = false) {
        const realBase = PokemonEvoLines.findBaseStage(pokemonName, maxRegion);
        const dummyBase = PokemonEvoLines.findBaseStage(pokemonName, maxRegion, true);
        let useDummyBase = followDummy;
        // check for base stages with no actual evo methods
        // babies[baby kang, happinys, mantyke, phione], evos[meltan, milcery, kubfu]
        if (pokemonMap[dummyBase].evolutions?.every(e => e.trigger === EvoTrigger.NONE)) {
            useDummyBase = true;
        }

        const base = useDummyBase ? dummyBase : realBase;
        const lineage = useDummyBase ? PokemonEvoLineageType.EvolutionIncludingDummy : PokemonEvoLineageType.Evolution;

        let family: PokemonNameType[] = [base];
        while (!family.filter(p => pokemonMap[p].evolutions).every(pk => pokemonMap[pk].evolutions?.every(e => family.includes(e.evolvedPokemon)))) {
            family.forEach(p => pokemonMap[p].evolutions?.forEach(e => !family.includes(e.evolvedPokemon) ? family.push(e.evolvedPokemon) : ''));
        }

        // filter out stuff we don't want
        family = family.filter(p => {
            if (Object.keys(PokemonLocations.getPokemonLocations(p)).length < 1) {
                return false;
            }
            if (PokemonHelper.isMegaEvolution(p)) {
                return player.hasMegaStone(PokemonHelper.getMegaPokemonStone(p)) || player.highestRegion() === GameConstants.MAX_AVAILABLE_REGION;
            }
            // gmax (for alcremie and urshifu. if we add a unique evo method for them change it like megas)
            if (PokemonHelper.isGigantamaxForm(p)) {
                return followDummy && player.highestRegion() >= GameConstants.Region.galar;
            }
            return PokemonLocations.getEvoLineage(p, maxRegion)[lineage];
        }).sort((a,b) => pokemonMap[a].id - pokemonMap[b].id);

        // reattach base stage if it got filtered out above
        // also moves babies like pichu or non-baby prevos like elflax to front again after sorting by id
        const prevo: PokemonNameType[] = !PokemonLocations.getEvoLineage(base, maxRegion)[lineage] ? [base] : [];

        return prevo.concat(family).filter(p => pokemonMap[p].nativeRegion <= maxRegion);
    }

    public static getEvoMethods(evoLine: PokemonNameType[]) {
        const familyMap = evoLine.map(p => pokemonMap[p]);
        const evos: EvoData[] = familyMap.filter(p => p.evolutions).flatMap(p => p.evolutions);
        // The map groups evo methods by evolvedPokemon to keep them in order
        return Object.fromEntries(evoLine.map(pk => [pk, evos.filter(mn => mn.evolvedPokemon === pk)]));
    }

    public static getAllFirstStagePokemon(maxRegion: GameConstants.Region = GameConstants.MAX_AVAILABLE_REGION) {
        return pokemonList.filter((p: PokemonListData) =>
            p.evolutions?.some(e => Math.floor(pokemonMap[e.evolvedPokemon].id) != Math.floor(p.id) && pokemonMap[e.evolvedPokemon].nativeRegion <= maxRegion)
            && PokemonEvoLines.findBaseStage(p.name, maxRegion) === p.name
            && p.nativeRegion <= maxRegion
        );
    }
}
