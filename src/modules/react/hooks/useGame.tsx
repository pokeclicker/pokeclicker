import React, { createContext, useContext } from 'react';

const GameContext = createContext(null);

export const Provider = ({ Game, children }) => (
    <GameContext.Provider value={ Game }>
        {children}
    </GameContext.Provider>
);

export const useGame = () => useContext(GameContext);
