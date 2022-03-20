import React from 'react';
import ReactDOM from 'react-dom';
import ReactApp from './App';

const render = () => {
    ReactDOM.render(
        <ReactApp />,
        document.getElementById('react-root'),
    );
};

export default render;
