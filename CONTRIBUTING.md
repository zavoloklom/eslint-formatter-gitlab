# Contribution Guidelines

Please note that this project is released with a [Contributor Code of Conduct](./CODE_OF_CONDUCT.md). By participating
in this project you agree to abide by its causes.

## Source Code

The source code is hosted on [GitLab](https://gitlab.com/gitlab-formatters/eslint-gitlab-formatter). Although there is
an automatic mirror of this repository on [GitHub](https://github.com/zavoloklom/eslint-formatter-gitlab), all bug
reports, feature requests, and merge requests should be submitted through GitLab.

## Useful Articles and Documentation

- [Eslint Custom Formatters Documentation](https://eslint.org/docs/latest/extend/custom-formatters)
- [Gitlab Code Quality Custom Tool Documentation](https://docs.gitlab.com/ee/ci/testing/code_quality.html#implement-a-custom-tool)
- [Codeclimate Issue Data Type](https://github.com/codeclimate/platform/blob/master/spec/analyzers/SPEC.md#issues)
- [Codeclimate Eslint Source Code](https://github.com/codeclimate/codeclimate-eslint/blob/master/lib/eslint.js)

## Prerequisites

Before making contributions, ensure the following:

- Your local development environment matches the project's requirements for versions of node.js, npm, and any other
  necessary tools.
- You have thoroughly read the project documentation to best understand its features and functionalities.

## Contribution Process

1. **Fork and Clone**: Fork this project on GitLab and clone your fork locally.
2. **Create a Branch**: Create a new branch in your local repository. This keeps your changes organized and separate
   from the main project.
3. **Development**: Make your changes in your branch. Here are a few things to keep in mind:
    - **No Lint Errors**: Ensure your code changes adhere to the project's linting rules and do not introduce new lint
      errors.
    - **Testing**: All changes must be accompanied by passing tests. Add new tests if you are adding functionality or
      fix existing tests if you are changing code.
    - **Conventional Commits**: Commit your changes using
      the [Conventional Commits](https://www.conventionalcommits.org) format. This standardization helps automate the
      version management and changelog generation.

## Submitting Changes

After you've made your changes:

1. **Run Linters and Tests**: Before submitting your changes, run the linters and tests to ensure everything is in
   order.
2. **Push to GitLab**: Push your changes to your fork on GitLab.
3. **Create a Merge Request**: Open a merge request from your fork/branch to the main repository on GitLab. Provide a
   clear and detailed description of your changes and why they are necessary.
4. **Code Review**: Once your merge request is opened, it will be reviewed by other contributors. Be open to feedback
   and willing to make further adjustments based on the discussions.
5. **Merge**: If your merge request passes the review, it will be merged into the main codebase.

## After your contribution

Once your contribution is merged, it will become part of the project.
I appreciate your hard work and contribution to making this tool better.
Also, I encourage you to continue participating in the project and joining in discussions and future enhancements.

Thank you for contributing!
