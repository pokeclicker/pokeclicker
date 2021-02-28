// Utilities for controlling the user interface

import type JQuery from 'jquery';
import Amount from '../wallet/Amount';
import Settings from '../settings';
import { Currency } from '../GameConstants';

// eslint-disable-next-line import/prefer-default-export
export function animateCurrency({ amount, currency }: Amount) {
    // Check if animations have been disabled
    if (!Settings.getSetting('showCurrencyGainedAnimation').observableValue()) {
        return;
    }
    const target = $(`#animateCurrency-${Currency[currency]}`);
    // If no target for this currency, return
    if (!target.length) {
        return;
    }
    const targetVisible = target.is(':visible');

    let pos: JQuery.Coordinates;
    if (target.offset() && targetVisible) {
        pos = target.offset();
        pos.top -= 15;
    } else {
        pos = $('#gameTitle').offset();
        pos.top += 45;
        pos.left -= 100;
    }

    const left = ((Math.random() * ((pos.left + 25) - (pos.left - 25)) + (pos.left - 25))).toFixed(2);
    const ani = `<p style="z-index:50;position:absolute;left:${left}px;top:${pos.top}px; font-size:${10 + 0.5 * Math.log(amount)}px;">+${amount.toLocaleString('en-US')}</p>`;
    $(ani).prependTo('body').animate({
        top: 10,
        opacity: 0,
    }, 200 * Math.log(amount) + 1000, 'linear',
    () => {
        $(this).remove();
    });
}
