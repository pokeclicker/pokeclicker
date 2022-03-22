import React from 'react';
import { useGame, useComputed } from '../../hooks';
import { LogBookTypes } from '../../../logbook/LogBookTypes';

const LogBookFilters = () => {
    const Game = useGame();

    return useComputed(() => (
        <div className="form-row collapse" id="log-book-filter" style={{ width: '100%' }}>
            { Object.entries(Game.logbook.filters).map(([filter, isActive]) => {
                const active = isActive();
                const { display } = LogBookTypes[filter];
                return (
                    <button key={`log-filter-${filter}`}
                        className={`btn col ${active ? `btn-${display}` : `btn-outline-${display}`}`}
                        onClick={(event) => { event.currentTarget.blur(); isActive(!active); }}>
                        { filter.replace(/_/g, ' ') }
                    </button>
                );
            })}
        </div>
    ), []);
};

export default LogBookFilters;
