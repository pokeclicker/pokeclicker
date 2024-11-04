import { vi } from 'vitest';
import * as ko from 'knockout';
const mockJQuery = vi.fn();
mockJQuery.mockImplementation(() => mockJQuery);
Object.assign(mockJQuery, {
    ready: mockJQuery,
});

window.ko = ko;
window.$ = mockJQuery;

// would need a newer jsdom version to support this 
window.CSS = {
    supports: (...args) => {
        if (args.length === 2) {
            const [propertyName, value] = args;
            // 'color' property
            // Limited implementation only covering currently-needed values
            if (propertyName === 'color') {
                // Matches three-, four-, six-, and eight-value hex colors
                const hexCodeRegex = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/; 
                if (hexCodeRegex.test(value) || value === 'transparent') {
                    return true;
                }
            }
        }
        return false;
    },
};
