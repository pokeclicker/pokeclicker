import React from 'react';
import ReactDOM from 'react-dom';
import { GameShim } from '../temporaryTypes';
import ReactApp from './App';
import { Provider } from './hooks';

const bindReact = (Game: GameShim) => {
    ReactDOM.render(
        <Provider Game={Game}>
            <ReactApp />
        </Provider>,
        document.getElementById('react-root'),
    );
};

export default bindReact;
