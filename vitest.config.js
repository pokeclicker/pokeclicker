/// <reference types="vitest/config" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [
        {
            name: 'a-vitest-plugin-that-changes-config',
            config: () => ({
                test: {
                    setupFiles: 'vitest.setup.js',
                },
            }),
        },
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        globalSetup: 'vitest.global.setup.js',
        include: [
            'src/modules/**/__tests__/**/*.[jt]s?(x)',
            'src/modules/**/?(*.)+(spec|test).[tj]s?(x)',
        ],
        coverage: {
            enabled: true,
            all: true,
            include: ['src/modules/**/*.{ts,tsx}'],
            exclude: [],
        },
    },
});
