///<reference path="MoneyRequirement.ts"/>
///<reference path="TokenRequirement.ts"/>
///<reference path="AttackRequirement.ts"/>
///<reference path="DiamondRequirement.ts"/>
///<reference path="UndergroundItemsFoundRequirement.ts"/>
///<reference path="UndergroundLayersMinedRequirement.ts"/>
///<reference path="CapturedRequirement.ts"/>
///<reference path="DefeatedRequirement.ts"/>
///<reference path="ShinyPokemonRequirement.ts"/>
///<reference path="HatchRequirement.ts"/>
///<reference path="PokeballRequirement.ts"/>
///<reference path="RouteKillRequirement.ts"/>
///<reference path="ClearGymRequirement.ts"/>
///<reference path="ClearDungeonRequirement.ts"/>
///<reference path="ClickRequirement.ts"/>

const AchievementType = {
    'money': MoneyRequirement.name,
    'dungeonToken': TokenRequirement.name,
    'attack': AttackRequirement.name,
    'diamond': DiamondRequirement.name,
    'itemDiggedUp': UndergroundItemsFoundRequirement.name,
    'dig': UndergroundLayersMinedRequirement.name,
    'capture': CapturedRequirement.name,
    'defeat': DefeatedRequirement.name,
    'shiny': ShinyPokemonRequirement.name,
    'egg': HatchRequirement.name,
    'ball': PokeballRequirement.name,
    'route': RouteKillRequirement.name,
    'gym': ClearGymRequirement.name,
    'dungeon': ClearDungeonRequirement.name,
    'click': ClickRequirement.name,
};