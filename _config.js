module.exports = {
    CNAME: false,                                                               // optional (false) - GitHub pages custom domain
    DEVELOPMENT: (() => process.env.NODE_ENV != 'production')(),                // optional - Whether we are running in a development environment or not
    DEV_BANNER: (() => process.env.HEROKU)(),                                   // optional (false) - If the development banner should be shown
    DISCORD_LOGIN_PROXY: false,                                                 // optional (false) - Discord login proxy link (example: https://gist.github.com/RedSparr0w/69304dce27cccf2ac4a1fe65f7da1836)
    FEATURE_FLAGS: {                                                            // optional - Toggle feature flags for development
        preloadUnreleasedTowns: (() => process.env.NODE_ENV != 'production')(), // optional (false) - Enable preloading images for unreleased towns
    },
    TRANSLATIONS_URL: 'https://translations.pokeclicker.com',                   // optional - URL to load translation files from
};
