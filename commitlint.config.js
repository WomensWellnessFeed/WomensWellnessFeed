/**
 * Commitlint Configuration
 *
 * Enforces Conventional Commits specification:
 * https://www.conventionalcommits.org/
 *
 * Format: <type>(<scope>): <subject>
 *
 * Examples:
 *   ✅ feat(auth): add biometric login
 *   ✅ fix(navigation): resolve back button crash on Android
 *   ✅ docs: update README with setup instructions
 *   ✅ refactor(api)!: migrate to REST API v2 (breaking change)
 *   ❌ updated stuff (too vague, no type)
 *   ❌ Fix bug (capital F, no scope context)
 */

module.exports = {
    // Extend the conventional commit rules
    extends: ['@commitlint/config-conventional'],

    rules: {
        // Type: Must be one of these
        'type-enum': [
            2, // Level: error
            'always',
            [
                'feat', // New feature
                'fix', // Bug fix
                'docs', // Documentation only changes
                'style', // Code style changes (formatting, missing semi-colons, etc)
                'refactor', // Code change that neither fixes a bug nor adds a feature
                'perf', // Performance improvement
                'test', // Adding or updating tests
                'build', // Changes to build system or dependencies
                'ci', // CI/CD configuration changes
                'chore', // Other changes that don't modify src or test files
                'revert', // Revert a previous commit
            ],
        ],

        // Subject: Must not be empty
        'subject-empty': [2, 'never'],

        // Subject: Must not end with a period
        'subject-full-stop': [2, 'never', '.'],

        // Subject: Must be lowercase (conventional style)
        'subject-case': [2, 'always', 'lower-case'],

        // Type: Must be lowercase
        'type-case': [2, 'always', 'lower-case'],

        // Type: Must not be empty
        'type-empty': [2, 'never'],

        // Header (entire first line): Max 100 characters
        // Keeps commit messages readable in git log
        'header-max-length': [2, 'always', 100],

        // Body: Max line length 100 characters
        'body-max-line-length': [2, 'always', 100],

        // Scope: Optional but if provided, must be lowercase
        'scope-case': [2, 'always', 'lower-case'],
    },
};
