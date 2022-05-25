module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/ui/$1',
    '^~/(.*)$': '<rootDir>/app/$1',
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
    '<rootDir>/app/rest/**/*.(test|spec).@(js|ts)',
    '<rootDir>/ui/test/**/*.(test|spec).@(js|ts)',
    '<rootDir>/ui/components/**/*.(test|spec).@(js|ts)'
  ],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/ui/components/**/*.vue',
    '<rootDir>/ui/pages/**/*.vue',
    '<rootDir>/app/rest/**/*.(test|spec).@(js|ts)'
  ],
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/ui/test/index.ts']
}
