import {transform} from '@babel/core';

import babelPluginInclude from '../src/index';

describe('babel-plugin-include', () => {
  it('handles a file that includes another file, which in turn includes another file', () => {
    const code = `include("fixtures/nested_a_javascript.js");`;
    const expectedCode = `const z = 30;\nconst x = 10;`;

    const result = transform(code, {
      filename: __filename,
      plugins: [[babelPluginInclude]],
    });

    expect(result?.code?.trim()).toEqual(expectedCode?.trim());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
