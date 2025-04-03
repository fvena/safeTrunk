import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";

export default defineConfig({
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
  ],
  test: {
    clearMocks: true,
    coverage: {
      exclude: [
        "node_modules/**",
        "dist/**",
        "**/*.d.ts",
        "**/*.test.ts",
        "**/*.config.ts",
        "**/setup.ts",
        "**/vitest.config.ts",
      ],
      include: ["src/**/*.ts"],
      provider: "v8",
      reporter: ["text", "lcovonly"],
    },
    environment: "node", // jsdom
    globals: true,
  },
});
