import React from 'react';
import { useGame } from './hooks/useGame';

const ReactApp = () => {
    const Game = useGame();
    return (
        <div>
            Rendered with React!
            <span>{JSON.stringify(Game)}</span>
        </div>
    );
};

export default ReactApp;
