import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";
import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["/node_modules/"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: { ...pathsToModuleNameMapper(compilerOptions.paths) },
  modulePathIgnorePatterns: ["/dist/"],
};

export default jestConfig;
