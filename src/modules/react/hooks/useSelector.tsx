import { useState } from 'react';
import { Observable, PureComputed } from 'knockout';
import { GameShim } from '../../temporaryTypes';
import { useGame } from './useGame';

export type Selector<T> = (game: GameShim) => PureComputed<T> | Observable<T>;

export function useSelector<T>(selector: Selector<T>): T {
    const game = useGame();
    const observable = selector(game);
    const [state, setState] = useState(observable());

    observable.subscribe((value) => {
        setState(value);
    });

    return state;
}
