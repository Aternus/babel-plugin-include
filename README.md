# @aternus/babel-plugin-include

Adds support for the `include()` function to the Babel compiler.

## Why use this plugin?

A simple way to organize and reuse code.

The goal of this plugin is to allow a "native" way of including JavaScript code
inline - at compilation time.

## Installation

```bash
npm install -D @aternus/babel-plugin-include @babel/core @babel/cli
```

### `.babelrc.json` / `babel.config.json` (Recommended)

```json
{
  "plugins": ["@aternus/babel-plugin-include"]
}
```

## Usage

The `include()` function takes an argument, a file path, e.g. `file.js`.

## Code

### `main.js`

```javascript
include('welcome.js');
include('stateManager.js');
```

### `welcome.js`

```javascript
console.log('Welcome code');
```

### `stateManager.js`

```javascript
console.log('State manager code');
```

### Result after compilation with Babel

```javascript
console.log('Welcome code');
console.log('State manager code');
```

## FAQ

- The `include()` function takes a single string as an argument. Following
  arguments are ignored.
- The included file must be a valid JavaScript file. If there are errors the
  compiler will throw an error.
- The default encoding is assumed to be `utf8`.
- You can use relative and absolute filenames, and change the `root` directory
  in plugin options.

---

## Programmatic Invocation

### Node API

```javascript
const transformedCode = require('@babel/core').transform(code, {
  plugins: ['@aternus/babel-plugin-include'],
});
```

### CLI

```bash
npx babel --plugins @aternus/babel-plugin-include main.js
```

## Integrations

### IDEs / TypeScript

The plugin ships with TypeScript types which the IDEs and TypeScript can use to
understand the new `include` syntax capability without you having to take any
action.

⚠ Keep in mind that you'll still need to use Babel as the transpiler (this is a
babel plugin after all 😅)

### ESLint

The plugin ships with an ESLint config you can extend to avoid getting errors
about `include` being undefined.

In your `.eslintrc.js`:

```javascript
module.exports = {
  extends: [
    // ...
    './node_modules/@aternus/babel-plugin-include/eslint',
  ],
  // ...
};
```

⚠ `./node_modules` is required to ensure that ESLint won't add "eslint-config"
to the package name, resulting in a wrong path.

## Options

You can provide an options object to modify the default behavior of the plugin.

```javascript
{
  plugins: [['@aternus/babel-plugin-include', options]];
}
```

### The following options are available:

| Option Name | Type             | Default             | Notes                                                                     |
| ----------- | ---------------- | ------------------- | ------------------------------------------------------------------------- |
| `root`      | `string`         | `cwd()` of the file | The root directory from which all files will be included.                 |
| `encoding`  | `BufferEncoding` | `utf-8`             | The encoding option specifies which encoding to use when including files. |

## Credits

[vihanb](https://github.com/vihanb) for the original package (no longer
maintained).

## License

Released under the MIT License - see `LICENSE.md` for details.
