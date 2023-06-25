import {transform} from '@babel/core';

import babelPluginInclude from '../src/index';

const dummyFileContent = 'const x = 10;';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  readFileSync: jest.fn().mockImplementation((path, encoding) => {
    if (path === './dummy.js') {
      return dummyFileContent;
    }

    return jest.requireActual('fs').readFileSync(path, encoding);
  }),
}));

describe('babel-plugin-include', () => {
  it('replaces include(pathToFile) with the content of pathToFile', () => {
    const code = 'include("./dummy.js");';
    const expectedCode = dummyFileContent;

    const result = transform(code, {
      filename: './index.js',
      // plugins: [[babelPluginInclude, {root: './', encoding: 'utf8'}]],
      plugins: [[babelPluginInclude]],
    });

    expect(result?.code?.trim()).toEqual(expectedCode);
  });

  afterAll(() => {
    // Restore the original fs.readFileSync function after running the tests
    jest.restoreAllMocks();
  });
});
