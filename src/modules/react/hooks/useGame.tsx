import React, { createContext, useContext, ReactNode } from 'react';
import { GameShim } from '../../temporaryTypes';

const GameContext = createContext(null);

type ProviderProps = {
    Game: GameShim;
    children: ReactNode;
};
export const Provider = ({ Game, children }: ProviderProps) => (
    <GameContext.Provider value={ Game }>
        {children}
    </GameContext.Provider>
);

export const useGame = (): GameShim => useContext(GameContext);
