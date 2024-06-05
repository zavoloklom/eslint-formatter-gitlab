# Eslint Gitlab Codequality Formatter

[![Latest Release](https://gitlab.com/gitlab-formatters/eslint-formatter-gitlab/-/badges/release.svg?style=flat-square)](https://gitlab.com/gitlab-formatters/eslint-formatter-gitlab/-/releases)
![Coverage Badge](https://img.shields.io/codacy/coverage/f40620b9d84b4424ae766a0bda5d768c?style=flat-square&label=Coverage)
[![Codacy Code Quality Badge](https://img.shields.io/codacy/grade/f40620b9d84b4424ae766a0bda5d768c?style=flat-square&logo=codacy&label=Code%20Quality)](https://app.codacy.com/gl/gitlab-formatters/eslint-formatter-gitlab/dashboard?utm_source=gl&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=whit&style=flat-square)](https://conventionalcommits.org)

Formatter that transforms [ESLint](https://eslint.org/) reports into a format suitable for use
with [GitLab widgets](https://docs.gitlab.com/ee/ci/testing/code_quality.html).

> The source code is hosted on [GitLab](https://gitlab.com/gitlab-formatters/eslint-formatter-gitlab).
> Although there is an automatic mirror of this repository
> on [GitHub](https://github.com/zavoloklom/eslint-formatter-gitlab), all bug reports, feature requests, and merge
> requests should be submitted through GitLab.

## Usage

Install `eslint` and `@gitlab-formatters/eslint-formatter-gitlab` using your package manager:

```bash
npm install --save-dev eslint @gitlab-formatters/eslint-formatter-gitlab
```

```bash
yarn add --dev eslint @gitlab-formatters/eslint-formatter-gitlab
```

To use in your project, simply run:

```bash
npx eslint . --format=@gitlab-formatters/gitlab
```

For integration with GitLab CI, add the following to your `.gitlab-ci.yml`:

```yml
eslint:
  image: node:20.14.0-alpine3.20
  stage: codequality
  script:
    - npm ci
    - npx eslint . --format=@gitlab-formatters/gitlab --output-file=gl-codequality.json
  artifacts:
    reports:
      codequality: gl-codequality.json
```

## Report Example

Below is a JSON example of how the formatter reports issues.

This particular example outputs a detailed report that goes beyond the minimal fields required by GitLab's code quality
widgets.

While GitLab requires only a subset of fields according to
the [Gitlab Code Quality specification](https://docs.gitlab.com/ee/ci/testing/code_quality.html#implement-a-custom-tool),
this formatter implements the full set of fields as outlined in
the [Code Climate Issue Data Type specification](https://github.com/codeclimate/platform/blob/master/spec/analyzers/SPEC.md#issues).

This comprehensive implementation enhances the depth of information available and facilitates better issue tracking and
resolution.

```json
[
  {
    "type": "issue",
    "check_name": "import/order",
    "description": "`./app.module` import should occur after import of `@nestjs/mongoose/dist/mongoose-core.module`",
    "content": {
      "body": "Error found in import/order"
    },
    "categories": [
      "Style"
    ],
    "location": {
      "path": "src/cli.ts",
      "lines": {
        "begin": 2,
        "end": 2
      },
      "positions": {
        "begin": {
          "line": 2,
          "column": 1
        },
        "end": {
          "line": 2,
          "column": 42
        }
      }
    },
    "severity": "major",
    "fingerprint": "9209a8c4e2408f83d9dd5063891f4e96"
  }
]
```

You can see an example of the widget and how errors are displayed
in [Merge Request #2](https://gitlab.com/gitlab-formatters/eslint-formatter-gitlab/-/merge_requests/2).

This merge request includes detailed examples and explanations of the widget's functionality, showcasing how it
integrates with GitLab to display code quality issues reported by ESLint.

Reviewing this merge request can provide insights into the formatter's capabilities and how it enhances error reporting
within GitLab.

## Contributing

If you'd like to contribute to this project, please read through [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## Changelog

> Changelog is automatically generated based on [semantic-release](https://github.com/semantic-release/changelog)
> and [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

See the [CHANGELOG.md](./CHANGELOG.md) file for detailed lists of changes for each version.

## License

MIT License. See the [License File](./LICENSE) for more information.

## Contact

If you have any questions or suggestions, feel free to reach out by

- Email: [s.kupletsky@gmail.com](mailto:s.kupletsky@gmail.com)
- Twitter: <https://twitter.com/zavoloklom/>
- GitHub: <https://github.com/zavoloklom/>
