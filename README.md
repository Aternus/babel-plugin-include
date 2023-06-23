# @aternus/babel-plugin-include

Adds support for the `include()` function to the Babel compiler.

## Why use this plugin?

A simple way to organize and reuse code.

The goal of this plugin is to allow a "native" way of including JavaScript code
inline - at compilation time.

Sometimes a bundler (Webpack/Browserify) or a task runner (Grunt/Gulp) is just
too much overhead.

## Installation

```bash
npm install @aternus/babel-plugin-include
```

## Usage

### `.babelrc` (Recommended)

```json
{
  "plugins": ["@aternus/babel-plugin-include"]
}
```

### CLI

```bash
babel --plugins @aternus/babel-plugin-include main.js
```

### Node API

```javascript
require('@babel/core').transform('code', {
  plugins: ['@aternus/babel-plugin-include'],
});
```

## Example

The `include()` function take an argument, a filename (`file.js`).

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

## Options

You can provide an options object to modify the default behavior of the plugin.

```javascript
{
  plugins: [['@aternus/babel-plugin-include', options]];
}
```

### The following options are available:

#### `root`

Specify the root directory from which all files will be included. Default is
`root of the including file`.

```javascript
{
  plugins: [
    [
      '@aternus/babel-plugin-include',
      {
        root: 'project/src',
      },
    ],
  ];
}
```

#### `encoding`

Specify the encoding for the files. The encoding option specifies which encoding
to use when including files. Default is `utf8`.

```javascript
{
  plugins: [
    [
      '@aternus/babel-plugin-include',
      {
        encoding: 'utf16',
      },
    ],
  ];
}
```

## Credits

[vihanb](https://github.com/vihanb) for the original package (no longer
maintained).

## License

Released under the MIT License - see `LICENSE.md` for details.
