import React from 'react';
import ReactDOM from 'react-dom';
import ReactApp from './App';
import { Provider } from './hooks/useGame';

const bindReact = (Game: any) => {
    ReactDOM.render(
        <Provider Game={Game}>
            <ReactApp />
        </Provider>,
        document.getElementById('react-root'),
    );
};

export default bindReact;
