# Contributing to Callstack projects

## Code of Conduct

We want this community to be friendly and respectful to each other. Please read [the full text](/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

## Our Development Process

The core team works directly on GitHub and all work is public.

### Development workflow

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

1. Fork the repo and create your branch from `master` (a guide on [how to fork a repository](https://help.github.com/articles/fork-a-repo/)).
1. Do the changes you want and test them out before sending a pull request.

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix something meaningful.
- `feat`: new features, e.g. add new API.
- `refactor`: code refactor, e.g. new folder structure.
- `docs`: changes into documentation, e.g. add usage example.
- `test`: adding or updating tests, eg unit, snapshot testing.
- `chore`: tooling changes, e.g. change circleci config.
- `BREAKING CHANGE`: for changes that break existing usage, e.g. change API.

### Linting and tests

We type our code with Flow or TypeScript, use ESLint with Prettier for linting and formatting the code, and Jest for testing. Our pre-commit hooks verify that the linter and tests pass when commiting. You can also run the following commands manually:

- `yarn typecheck`: run type checks.
- `yarn lint`: lint files with eslint and prettier.
- `yarn test`: run unit tests with jest.

### Sending a pull request

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that all checks are passing.
- Follow the pull request template when opening a pull request.

## Reporting issues

You can report issues on our [bug tracker](https://github.com/callstack/super-app-showcase/issues). Please follow the issue template when opening an issue.

## License

By contributing to this project, you agree that your contributions will be licensed under its **MIT** license.
