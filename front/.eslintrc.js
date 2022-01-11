module.exports = {
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: ['node_modules/'],
  plugins: ['prettier'],
  extends: ['react-app', 'airbnb', 'prettier', 'react-app/jest'],
  rules: {
    // "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        useTabs: false,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'auto',
      },
    ],
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/button-has-type': 0,
    'no-alert': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'func-names': 0,
    'no-plusplus': 0,
    'no-return-assign': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
  },
  // settings: {
  //   'import/resolver': {
  //     node: {
  //       moduleDirectory: ['node_modules', 'src'],
  //     },
  //   },
  // },
};
