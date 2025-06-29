// Set this flag first thing so it will affect ALL observables
// Observables inherit the global value only at the time they're created
ko.options.deferUpdates = true;

// Get our polyfills loaded first
import './polyfill';

// Ensure that the Knockout Extenders are injected
import './koExtenders';

// Inject the Knockout bindingHandlers (may load other local modules due to imports)
import './koBindingHandlers';

// Load everything else
import './temporaryWindowInjection';
