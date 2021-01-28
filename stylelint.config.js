// Usage instructions:
//
// `npm i -D` the following:
//
// stylelint
// stylelint-config-standard
// stylelint-declaration-block-no-ignored-properties
// stylelint-declaration-strict-value
// stylelint-scss
//
// For more info:
// https://stylelint.io/user-guide/configuration/

module.exports = {
    // using standard config...
    // https://github.com/stylelint/stylelint-config-standard
    extends: [
        'stylelint-config-standard'
    ],

    plugins: [
        'stylelint-declaration-block-no-ignored-properties',
        'stylelint-declaration-strict-value',
        'stylelint-scss'
    ],

    // ...with custom rule overrides
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                // valid css and scss at-rules
                ignoreAtRules: [
                    'content',
                    'each',
                    'else',
                    'error',
                    'extend',
                    'for',
                    'function',
                    'if',
                    'import',
                    'include',
                    'keyframes',
                    'media',
                    'mixin',
                    'return',
                    'warn',
                    'while'
                ]
            }
        ],
        'at-rule-empty-line-before': [
            'always', {
                ignoreAtRules: ['else', 'import', 'return'],
                ignore: ['after-comment'],
                except: [
                    'blockless-after-blockless',
                    'first-nested'
                ]
            }
        ],
        'at-rule-name-space-after': 'always',
        'block-opening-brace-space-before': 'always',
        'block-closing-brace-newline-after': [
            'always', {
                ignoreAtRules: ['if', 'else']
            }
        ],
        'comment-empty-line-before': [
            'always',
            {
                except: ['first-nested'],
                ignore: [
                    'after-comment',
                    'stylelint-commands'
                ]
            }
        ],

        // no empty lines before declarations.
        'declaration-empty-line-before': 'never',

        // 4 spaces please
        indentation: 4,

        // over-nesting is confusing! max 3 levels
        'max-nesting-depth': 3,

        // one selector per line when the rule is multiline.
        'selector-list-comma-newline-after': 'always-multi-line',

        // remove 'double' requirement, which exists only for backwards
        // compatibility with IE. use single colons instead: `p:before`
        'selector-pseudo-element-colon-notation': null,

        // enforce class selector pattern; example: `.some-component`.
        'selector-class-pattern': [
            '^[a-z0-9\\-]+$',
            {
                message:
                    'Selector should be written in lowercase with hyphens ' +
                    '(selector-class-pattern)'
            }
        ],

        // compound selectors can have at most 3 parts, e.g. `.foo .bar > .baz`.
        'selector-max-compound-selectors': 3,

        // no id selectors allowed.
        'selector-max-id': 0,

        // disallow selectors like `p.large` (<p class="large" />).
        'selector-no-qualifying-type': true,

        // disable vendor prefixes like `input::-moz-placeholder` in selectors.
        // use autoprefixer if vendor prefixing is needed.
        'selector-no-vendor-prefix': true,

        // strings are single quoted.
        'string-quotes': 'single',

        // disable vendor prefixes like `-webkit-flex` in values.
        // use autoprefixer if vendor prefixing is needed.
        'value-no-vendor-prefix': true,

        // warn about useless rule usage.
        'plugin/declaration-block-no-ignored-properties': true,

        // enforce variable usage for colors.
        'scale-unlimited/declaration-strict-value': [
            ['color', 'font-family'],
            {
                ignoreKeywords: 'currentColor',
            }
        ],

        // scss plugin rules
        'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
        'scss/at-else-closing-brace-space-after': 'always-intermediate',
        'scss/at-else-if-parentheses-space-before': 'always',
        'scss/at-else-empty-line-before': 'never',
        'scss/at-extend-no-missing-placeholder': true,
        'scss/at-function-parentheses-space-before': 'never',
        'scss/at-function-pattern': '^[_]?[a-z]+([a-z0-9-]*[a-z0-9]+)?$',
        'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
        'scss/at-if-closing-brace-space-after': 'always-intermediate',
        'scss/at-import-no-partial-leading-underscore': true,
        'scss/at-import-partial-extension-blacklist': ['scss'],
        'scss/at-mixin-parentheses-space-before': 'never',
        'scss/at-mixin-pattern': '^[a-z]+([a-z0-9-]+[a-z0-9]+)?$',
        'scss/dollar-variable-colon-space-after': 'always',
        'scss/dollar-variable-colon-space-before': 'never',
        'scss/dollar-variable-pattern': '^[_]?[a-z]+([a-z0-9-]*[a-z0-9]+)?$',
        'scss/double-slash-comment-whitespace-inside': 'always',
        'scss/percent-placeholder-pattern': '^[a-z]+([a-z0-9-]*[a-z0-9]+)?$',
        'scss/operator-no-newline-before': true,
        'scss/operator-no-unspaced': true,
        'scss/selector-no-redundant-nesting-selector': true
    }
};
