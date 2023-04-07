import { afterAll, beforeAll } from 'vitest';
import * as ko from 'knockout';

beforeAll(() => {
    window.ko = ko;
});

afterAll(() => {
    delete window.ko;
});


window.ko = ko;
