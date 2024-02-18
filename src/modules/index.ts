// Get our polyfills loaded first
import './polyfill';

// Ensure that the Knockout Extenders are injected
import './koExtenders';

// Inject the Knockout bindingHandlers (may load other local modules due to imports)
import './koBindingHandlers';

// Load everything else
import './temporaryWindowInjection';
