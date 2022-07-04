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

function waitForLoad(el, fnc) {
    if (!document.getElementById(el)) return setTimeout(() => waitForLoad(el, fnc), 1000);
    return fnc();
}

waitForLoad('map', () => {
    const svgImage = document.getElementById('map');
    const svgContainer = document.getElementById('mapBody');

    const viewBox: Record<string, number> = {
        x: 0,
        y: 0,
        w: 1600,
        h: 960,
    };
    svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    // svgSize = {w:svgImage.clientWidth,h:svgImage.clientHeight};
    const svgSize: Record<string, number> = { w: 1600, h: 960 };
    let isPanning = false;
    let startPoint = { x: 0, y: 0 };
    let endPoint = { x: 0, y: 0 };
    let scale = 1;

    // player.region.subscribe(() => {
    //     const mapImage = svgImage.querySelector('image').getBBox() as any;
    //     mapImage.w = mapImage.width;
    //     mapImage.h = mapImage.height;
    //     viewBox = mapImage;
    //     svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    //     svgSize = mapImage;
    // });

    svgContainer.onwheel = (e) => {
        e.preventDefault();
        // If already max/max scale, return;
        const canScale = e.deltaY > 0 ? scale > 1 : scale < 3;
        if (!canScale) return;

        // Mouse pos
        const mx = e.offsetX;
        const my = e.offsetY;
        // New dimensions
        const dw = viewBox.w * Math.sign(-e.deltaY) * 0.07;
        const dh = viewBox.h * Math.sign(-e.deltaY) * 0.07;

        const dx = (dw * mx) / svgContainer.clientWidth;
        const dy = (dh * my) / svgContainer.clientHeight;
        viewBox.w = Math.min(svgSize.w, viewBox.w - dw);
        viewBox.h = Math.min(svgSize.h, viewBox.h - dh);
        viewBox.x = Math.max(0, Math.min(svgSize.w - viewBox.w, viewBox.x + dx));
        viewBox.y = Math.max(0, Math.min(svgSize.h - viewBox.h, viewBox.y + dy));
        scale = svgSize.w / viewBox.w;
        svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    };

    svgContainer.onmousedown = (e) => {
        isPanning = true;
        startPoint = { x: e.x, y: e.y };
    };

    svgContainer.onmousemove = (e) => {
        if (!isPanning) {
            return;
        }
        endPoint = { x: e.x, y: e.y };
        const dx = (startPoint.x - endPoint.x) / (scale / 3);
        const dy = (startPoint.y - endPoint.y) / (scale / 3);
        const movedViewBox = {
            x: Math.max(0, Math.min(svgSize.w - viewBox.w, viewBox.x + dx)),
            y: Math.max(0, Math.min(svgSize.h - viewBox.h, viewBox.y + dy)),
        };
        svgImage.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${viewBox.w} ${viewBox.h}`);
    };

    svgContainer.onmouseup = (e) => {
        if (!isPanning) {
            return;
        }
        endPoint = { x: e.x, y: e.y };
        const dx = (startPoint.x - endPoint.x) / (scale / 3);
        const dy = (startPoint.y - endPoint.y) / (scale / 3);
        viewBox.x = Math.max(0, Math.min(svgSize.w - viewBox.w, viewBox.x + dx));
        viewBox.y = Math.max(0, Math.min(svgSize.h - viewBox.h, viewBox.y + dy));
        svgImage.setAttribute('viewBox', `${Math.max(0, viewBox.x)} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        isPanning = false;
    };

    svgContainer.onmouseleave = (e) => {
        svgContainer.onmouseup(e);
    };
});
