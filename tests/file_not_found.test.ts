import {transform} from '@babel/core';

import babelPluginInclude from '../src/index';
import {FileNotFoundError} from '../src/errors';

describe('babel-plugin-include', () => {
  it('throws an error when the file to include does not exist', () => {
    const code = `include("fixtures/nonexistent.js");`;

    expect(() => {
      transform(code, {
        filename: __filename,
        plugins: [[babelPluginInclude]],
      });
    }).toThrowError(FileNotFoundError);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
