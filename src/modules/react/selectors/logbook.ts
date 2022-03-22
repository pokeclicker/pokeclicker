/* eslint-disable import/prefer-default-export */
import LogBookLog from '../../logbook/LogBookLog';
import { GameShim } from '../../temporaryTypes';
import { Selector } from '../hooks';

export const filteredLogs: Selector<LogBookLog[]> = (game: GameShim) => game.logbook.filteredLogs;
