// jest.config.ts
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions }        from "./tsconfig.json";

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],

  // compile JSX to JS only in the test environment
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },

  // 👇 HERE – extend the map
  moduleNameMapper: {
    // keep all your existing "@/…" path aliases
    ...pathsToModuleNameMapper(compilerOptions.paths ?? {}, {
      prefix: "<rootDir>/",
    }),

  "^@auth/prisma-adapter$": "<rootDir>/tests/__mocks__/prismaAdapter.js",
  "^next-auth$"           : "<rootDir>/tests/__mocks__/nextAuth.js",
  "^next-auth/(.*)$"      : "<rootDir>/tests/__mocks__/nextAuth.js",
  "^@auth/core/(.*)$"     : "<rootDir>/tests/__mocks__/nextAuth.js",
  "^stripe$"              : "<rootDir>/tests/__mocks__/stripe.js",
  },
};
