class RegionFactory {

    static createKanto(): Region {

        const routes: Route[] = [
            RouteFactory.createRoute(1, {
                land: ['Pidgey', 'Rattata'],
            }),

            RouteFactory.createRoute(2, {
                land: ['Caterpie', 'Weedle', 'Rattata', 'Nidoran(F)', 'Nidoran(M)'],
            }, [new RouteRequirement(1)]),

            RouteFactory.createRoute(3, {
                land: ['Pidgey', 'Rattata', 'Spearow', 'Sandshrew', 'Jigglypuff', 'Mankey'],
            }, [new RouteRequirement(2), new BadgeRequirement(BadgeCase.Badge.Boulder)]),

            RouteFactory.createRoute(4, {
                land: ['Rattata', 'Spearow', 'Ekans', 'Sandshrew', 'Mankey'],
                water: ['Poliwag', 'Goldeen', 'Psyduck', 'Krabby', 'Seaking'],
            }, [new RouteRequirement(3), new DungeonRequirement('Mt. Moon')]),

            RouteFactory.createRoute(5, {
                land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Jigglypuff', 'Oddish', 'Meowth', 'Mankey', 'Abra', 'Bellsprout'],
            }, [new RouteRequirement(4), new BadgeRequirement(BadgeCase.Badge.Cascade)]),

            RouteFactory.createRoute(6, {
                land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Jigglypuff', 'Oddish', 'Meowth', 'Mankey', 'Abra', 'Bellsprout'],
                water: ['Poliwag', 'Goldeen', 'Shellder', 'Krabby'],
            }, [new RouteRequirement(5)]),

            RouteFactory.createRoute(7, {
                land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Vulpix', 'Jigglypuff', 'Oddish', 'Meowth', 'Mankey', 'Growlithe', 'Abra', 'Bellsprout'],
            }, [new RouteRequirement(5), new RouteRequirement(10), , new BadgeRequirement(BadgeCase.Badge.Thunder)]),

            RouteFactory.createRoute(8, {
                land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Ekans', 'Sandshrew', 'Vulpix', 'Jigglypuff', 'Meowth', 'Mankey', 'Growlithe', 'Abra', 'Kadabra'],
            }, [new RouteRequirement(5), new RouteRequirement(6), new RouteRequirement(7), , new BadgeRequirement(BadgeCase.Badge.Thunder)]),

            RouteFactory.createRoute(9, {
                land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Sandshrew', 'Nidoran(F)', 'Nidoran(M)', 'Nidorina', 'Nidorino'],
            }, [new RouteRequirement(4), new BadgeRequirement(BadgeCase.Badge.Cascade)]),

            RouteFactory.createRoute(10, {
                land: ['Rattata', 'Raticate', 'Spearow', 'Ekans', 'Sandshrew', 'Nidoran(F)', 'Nidoran(M)', 'Machop', 'Magnemite', 'Voltorb'],
                water: ['Poliwag', 'Goldeen', 'Poliwhirl', 'Slowpoke', 'Krabby', 'Kingler', 'Horsea'],
            }, [new RouteRequirement(9)]),

            RouteFactory.createRoute(11, {
                land: ['Pidgey', 'Pidgeotto', 'Raticate', 'Rattata', 'Spearow', 'Ekans', 'Sandshrew', 'Drowzee'],
                water: ['Poliwag', 'Goldeen', 'Tentacool', 'Shellder', 'Krabby', 'Horsea'],
            }, [new RouteRequirement(6), new BadgeRequirement(BadgeCase.Badge.Thunder)]),

            RouteFactory.createRoute(12, {
                land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Farfetch\'d', 'Snorlax'],
                water: ['Slowbro', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacool', 'Krabby', 'Horsea', 'Seadra'],
            }, [new RouteRequirement(7), new RouteRequirement(10), new RouteRequirement(11), new BadgeRequirement(BadgeCase.Badge.Marsh)]),

            RouteFactory.createRoute(13, {
                land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Farfetch\'d', 'Ditto'],
                water: ['Slowbro', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacool', 'Krabby', 'Horsea', 'Seadra'],
            }, [new RouteRequirement(11), new RouteRequirement(12), new BadgeRequirement(BadgeCase.Badge.Marsh)]),

            RouteFactory.createRoute(14, {
                land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Venomoth', 'Bellsprout', 'Weepinbell', 'Ditto'],
                water: ['Poliwag', 'Goldeen'],
            }, [new RouteRequirement(13)]),

            RouteFactory.createRoute(15, {
                land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Venomoth', 'Bellsprout', 'Weepinbell', 'Ditto'],
            }, [new RouteRequirement(14)]),

            RouteFactory.createRoute(16, {
                land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Doduo', 'Snorlax'],
            }, [new RouteRequirement(8), new BadgeRequirement(BadgeCase.Badge.Marsh)]),

            RouteFactory.createRoute(17, {
                land: ['Raticate', 'Spearow', 'Fearow', 'Ponyta', 'Doduo', 'Dodrio'],
                water: ['Poliwag', 'Goldeen', 'Tentacool', 'Shellder', 'Krabby'],
            }, [new RouteRequirement(16)]),

            RouteFactory.createRoute(18, {
                land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Doduo'],
                water: ['Poliwag', 'Goldeen', 'Tentacool', 'Shellder', 'Krabby'],
            }, [new RouteRequirement(17)]),

            RouteFactory.createRoute(19, {
                water: ['Tentacool', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacruel', 'Shellder', 'Horsea', 'Staryu'],
            }, [new RouteRequirement(15), new RouteRequirement(18), new BadgeRequirement(BadgeCase.Badge.Soul)], true),

            RouteFactory.createRoute(20, {
                water: ['Tentacool', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacruel', 'Shellder', 'Horsea', 'Staryu'],
            }, [new RouteRequirement(19), new DungeonRequirement('Seafoam Islands')], true),

            RouteFactory.createRoute(21, {
                land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Raticate', 'Tangela'],
                water: ['Magikarp', 'Poliwag', 'Goldeen', 'Tentacruel', 'Shellder', 'Horsea', 'Staryu'],
            }, [new RouteRequirement(20), new BadgeRequirement(BadgeCase.Badge.Volcano)], true),

            RouteFactory.createRoute(22, {
                land: ['Rattata', 'Spearow', 'Nidoran(F)', 'Nidoran(M)', 'Mankey'],
                water: ['Poliwag', 'Poliwhirl', 'Goldeen'],
            }, [new RouteRequirement(1), new BadgeRequirement(BadgeCase.Badge.Earth)]),

            RouteFactory.createRoute(23, {
                land: ['Spearow', 'Fearow', 'Ekans', 'Arbok', 'Sandshrew', 'Sandslash', 'Nidorina', 'Nidorino', 'Mankey', 'Primeape', 'Ditto'],
                water: ['Poliwag', 'Goldeen', 'Poliwhirl', 'Slowbro', 'Kingler', 'Seadra', 'Seaking'],
            }, [new RouteRequirement(22)]),

            RouteFactory.createRoute(24, {
                land: ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Pidgey', 'Pidgey', 'Pidgeotto', 'Oddish', 'Venonat', 'Abra', 'Bellsprout'],
                water: ['Poliwag', 'Goldeen', 'Psyduck', 'Krabby', 'Seaking'],
            }, [new RouteRequirement(4), new BadgeRequirement(BadgeCase.Badge.Cascade)]),

            RouteFactory.createRoute(25, {
                land: ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Pidgey', 'Pidgeotto', 'Oddish', 'Venonat', 'Abra', 'Bellsprout'],
                water: ['Poliwag', 'Goldeen', 'Psyduck', 'Krabby'],
            }, [new RouteRequirement(24)]),
        ];

        const shops: Shop[] = [
            new Shop(ShopName.PewterCity, ['Pokeball', 'Token_collector', 'xExp', 'Dungeon_ticket']),
            new Shop(ShopName.CeruleanCity, ['Water_stone', 'xAttack', 'Water_egg']),
            new Shop(ShopName.VermillionCity, ['Thunder_stone', 'xExp', 'Electric_egg']),
            new Shop(ShopName.CeladonCity, ['Eevee', 'Porygon', 'Jynx', 'Mr. Mime', 'Lickitung']),
            new Shop(ShopName.SaffronCity, ['Moon_stone', 'xClick', 'Leaf_stone', 'Fighting_egg']),
            new Shop(ShopName.FuchsiaCity, ['Ultraball', 'Trade_stone', 'xExp', 'Dragon_egg']),
            new Shop(ShopName.CinnabarIsland, ['Fire_stone', 'Fire_egg', 'SmallRestore', 'Explorer_kit']),
            new Shop(ShopName.ViridianCity, ['xAttack', 'xClick', 'Mystery_egg']),
            new Shop(ShopName.LavenderTown, ['Greatball', 'Item_magnet', 'Lucky_incense', 'Grass_egg']),

        ];
        return new Region(RegionName.kanto, 151, routes, [], shops);
    }
}