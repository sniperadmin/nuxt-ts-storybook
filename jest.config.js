module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json', 'node'],
  modulePathIgnorePatterns: ['node_modules', 'jest-test-results.json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.*\\.(vue)$': '@vue/vue2-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub'
  },
  testMatch: [
    '<rootDir>/test/**/*.(test|spec).@(js|ts)',
    '<rootDir>/components/**/*.(test|spec).@(js|ts)'
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue'
  ],
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/test/index.ts']
}
