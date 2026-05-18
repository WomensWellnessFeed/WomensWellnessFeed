module.exports = {
    root: true,

    // Define the environments where your code runs
    // This tells ESLint what global variables are available
    env: {
        browser: true, // Browser globals like window, document
        es2021: true, // ES2021 globals and syntax
        node: true, // Node.js globals like process, __dirname
        'react-native/react-native': true, // React Native specific globals
    },

    // Extend recommended configurations
    // Order matters: later configs override earlier ones
    extends: [
        'eslint:recommended', // ESLint's base recommended rules
        'plugin:react/recommended', // React best practices
        'plugin:react-hooks/recommended', // React Hooks rules
        'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
        'plugin:@typescript-eslint/recommended-requiring-type-checking', // Stricter TS rules
        'prettier', // Disables ESLint rules that conflict with Prettier
    ],

    // Parser for TypeScript
    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaFeatures: {
            jsx: true, // Enable JSX parsing
        },
        ecmaVersion: 12,
        sourceType: 'module',

        // Required for type-aware linting rules
        // Point to your tsconfig.json
        project: './tsconfig.json',
    },

    // Plugins add additional rules
    plugins: ['react', 'react-native', '@typescript-eslint'],

    // Custom rule configurations
    rules: {
        // React specific rules
        'react/react-in-jsx-scope': 'off', // Not needed in React 17+
        'react/prop-types': 'off', // TypeScript handles prop validation
        'react-native/no-unused-styles': 'error', // Catch unused StyleSheet definitions
        'react-native/no-inline-styles': 'warn', // Encourage StyleSheet usage
        'react-native/no-color-literals': 'warn', // Encourage theme/constant usage

        // TypeScript specific rules
        '@typescript-eslint/explicit-module-boundary-types': 'off', // Allow inferred return types
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_', // Allow unused vars starting with _
                varsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/no-explicit-any': 'warn', // Discourage 'any' type
        '@typescript-eslint/no-floating-promises': 'error', // Require promise handling

        // General code quality rules
        'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow console.warn/error only
        'prefer-const': 'error', // Use const when variables aren't reassigned
        'no-var': 'error', // Disallow var, use let/const
        eqeqeq: ['error', 'always'], // Require === instead of ==
    },

    settings: {
        react: {
            version: 'detect', // Automatically detect React version
        },
    },

    // Ignore patterns (in addition to .eslintignore)
    ignorePatterns: ['node_modules/', 'dist/', 'build/', 'coverage/', '*.config.js', '.expo/'],
};
