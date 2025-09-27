import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    reporters: ['default', 'junit'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    include: ['**/*.test.ts'],
  },
});
