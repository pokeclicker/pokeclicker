import './temporaryWindowInjection';

// Ensure that the Knockout Extenders are injected
import './koExtenders';

import render from './react';

$(document).ready(() => {
    render();
});
