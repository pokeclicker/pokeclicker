// Utilities for controlling the user interface

import Amount from '../wallet/Amount';
import Settings from '../settings';
import { Currency } from '../GameConstants';
import Rand from './Rand';

// eslint-disable-next-line import/prefer-default-export
export function animateCurrency({ amount, currency }: Amount) {
    // Check if animations have been disabled
    if (!Settings.getSetting('showCurrencyGainedAnimation').observableValue()) {
        return;
    }
    const target = $(`#animateCurrency-${Currency[currency]}`);
    // If no target for this currency, return
    if (!target.length || !target.is(':visible')) {
        return;
    }

    // Add some randomness to where it appears
    const left = (target.position().left + Rand.float(target.width() - 25)).toFixed(2);
    const aniElement = document.createElement('p');
    aniElement.style.cssText = `z-index: 50; position: absolute; left: ${left}px; bottom: -20px; font-size: ${10 + 0.5 * Math.log(amount)}px;`;
    aniElement.innerText = `+${amount.toLocaleString('en-US')}`;

    // Append to parent container, animate and remove
    $(aniElement).prependTo(target.parent()).animate({
        bottom: 100,
        opacity: 0,
    }, 200 * Math.log(amount) + 1000, 'linear',
    () => {
        $(aniElement).remove();
    });
}
