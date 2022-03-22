import React from 'react';
import { useGame } from '../../hooks';

const LogBookFilters = () => {
    const Game = useGame();

    return (
        <div className="form-row collapse" id="log-book-filter" style={{ width: '100%' }}>
            { Object.entries(Game.logbook.filters).map(([filter, isActive]) => {
                const active = isActive();
                return (
                    <button key={`log-filter-${filter}`}
                        className={`btn col ${active ? `btn-${filter}` : `btn-outline-${filter}`}`}
                        onClick={(event) => { event.currentTarget.blur(); isActive(!active); }}>
                        { filter.replace(/_/g, ' ') }
                    </button>
                );
            })}
        </div>
    );
};

export default LogBookFilters;
