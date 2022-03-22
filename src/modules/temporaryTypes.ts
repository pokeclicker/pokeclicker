import LogBook from './logbook/LogBook';

// Until we have Game.ts in modules, this will have to do.
// Add to the definition as needed.
// There is a minimal amount of type safety with this at least,
//  typescript will attempt to assign the real App.game to this type
//  when we bindReact in App.ts
export type GameShim = {
    logbook: LogBook
};
