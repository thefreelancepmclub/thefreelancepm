// jest.config.ts
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],

  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.jest.json" }],
  },

  moduleNameMapper: {
    // ① all TS-config paths first (includes the bad back-slash @/ rule)
    ...pathsToModuleNameMapper(compilerOptions.paths ?? {}, {
      prefix: "<rootDir>/",
    }),

    // ② NOW put the clean rule so it wins
    "^@/(.*)$": "<rootDir>/src/$1",

    // mocks
    "^@auth/prisma-adapter$": "<rootDir>/tests/__mocks__/prismaAdapter.js",
    "^next-auth$"           : "<rootDir>/tests/__mocks__/nextAuth.js",
    "^next-auth/(.*)$"      : "<rootDir>/tests/__mocks__/nextAuth.js",
    "^@auth/core/(.*)$"     : "<rootDir>/tests/__mocks__/nextAuth.js",
    "^stripe$"              : "<rootDir>/tests/__mocks__/stripe.js",
  },

  // (optional) helps resolution on Windows
  moduleDirectories: ["node_modules", "<rootDir>/src"],
};
