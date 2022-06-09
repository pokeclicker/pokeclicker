// Utilities for controlling the user interface

import Amount from '../wallet/Amount';
import Settings from '../settings';
import { Currency } from '../GameConstants';
import Rand from './Rand';

// eslint-disable-next-line import/prefer-default-export
export function animateCurrency({ amount, currency }: Amount) {
    // Check if animations have been disabled
    if (amount > 0 && !Settings.getSetting('showCurrencyGainedAnimation').observableValue()) {
        return;
    }
    if (amount < 0 && !Settings.getSetting('showCurrencyLostAnimation').observableValue()) {
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
    aniElement.className = `${amount > 0 ? '' : 'text-danger'} animated-currency`;
    aniElement.style.cssText = `${amount > 0 ? 'bottom: -20px;' : 'bottom: -30px;'} left: ${left}px; font-size: ${10 + 0.5 * Math.log(Math.abs(amount))}px;`;
    aniElement.innerText = `${amount > 0 ? '+' : ''}${amount.toLocaleString('en-US')}`;

    const animationDirection = amount > 0 ? { bottom: 100 } : { bottom: -80 };
    // Shorter animation for currency lost
    const animationTime = 200 * Math.log(Math.abs(amount)) + (amount > 0 ? 1000 : 600);
    // Append to parent container, animate and remove
    $(aniElement).prependTo(target.parent()).animate({
        ...animationDirection,
        opacity: 0,
    }, animationTime, 'linear',
    () => {
        $(aniElement).remove();
    });
}
