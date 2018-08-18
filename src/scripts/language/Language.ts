class Language {
    language:object;
    constructor(language) {
        this.language = language
    } 

    getValue(value, ...args) {
        console.log(value)
        var language = languages[player._language()]['language']
        if(typeof language[value] == 'function') return language[value](...args)
        else return language[value]
    }
}

var languages = {}

languages['english'] = new Language({
    'route' : (routeNumber) => 'Route '+routeNumber,
    'caught' : 'Caught',
    'new' : 'New',
    'oakItemRequirement' : (requiremenetAmount) => `Capture ${requiremenetAmount} Pokémon to unlock!`,
    'Pokedex #' : 'Pokedex #',
    'Name' : 'Name',
    'Attack' : 'Attack',
    'Level' : 'Level',
    'Shiny' : 'Shiny',
})

languages['spanish'] = new Language({
    'route' : (routeNumber) => 'Route '+routeNumber,
    'caught' : 'Caught',
    'new' : 'Nueva',
    'oakItemRequirement' : (requiremenetAmount) => `Capture ${requiremenetAmount} Pokémon to unlock!`,
    'Pokedex #' : 'Pokedex #',
    'Name' : 'Llama',
    'Attack' : 'Attack',
    'Level' : 'Level',
    'Shiny' : 'Shiny'
})
