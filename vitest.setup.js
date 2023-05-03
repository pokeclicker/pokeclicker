import { vi } from 'vitest';
import * as ko from 'knockout';
const mockJQuery = vi.fn();
mockJQuery.mockImplementation(() => mockJQuery);
Object.assign(mockJQuery, {
    ready: mockJQuery,
});

window.ko = ko;
window.$ = mockJQuery;
