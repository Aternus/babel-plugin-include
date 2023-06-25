import path from 'path';
import {transform} from '@babel/core';

import babelPluginInclude from '../src/index';

const dummyFileContent = 'const x = 10;';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  readFileSync: jest.fn().mockImplementation((path, encoding) => {
    if (path.endsWith('basic_javascript.js')) {
      return dummyFileContent;
    }

    return jest.requireActual('fs').readFileSync(path, encoding);
  }),
}));

describe('babel-plugin-include', () => {
  it('replaces include("relativePathToFile") with the content of pathToFile', () => {
    const code = 'include("./fixtures/basic_javascript.js");';
    const expectedCode = dummyFileContent;

    const result = transform(code, {
      filename: __filename,
      plugins: [[babelPluginInclude]],
    });

    expect(result?.code?.trim()).toEqual(expectedCode);
  });

  it('replaces include("absolutePathToFile") with the content of pathToFile', () => {
    const absolutePathToFile = path.resolve(
      __dirname,
      './fixtures/basic_javascript.js',
    );
    const code = `include("${absolutePathToFile}");`;
    const expectedCode = dummyFileContent;

    const result = transform(code, {
      filename: __filename,
      plugins: [[babelPluginInclude]],
    });

    expect(result?.code?.trim()).toEqual(expectedCode);
  });

  it('uses root option and relative path to include file', () => {
    const rootDir = path.resolve(__dirname, './fixtures');
    const code = 'include("basic_javascript.js");';
    const expectedCode = dummyFileContent;

    const result = transform(code, {
      filename: __filename,
      plugins: [[babelPluginInclude, {root: rootDir}]],
    });

    expect(result?.code?.trim()).toEqual(expectedCode);
  });

  it('reads files using the provided encoding', () => {
    const code = 'include("./fixtures/basic_javascript.js");';
    const expectedCode = dummyFileContent;

    const result = transform(code, {
      filename: __filename,
      plugins: [[babelPluginInclude, {encoding: 'latin1'}]],
    });

    expect(result?.code?.trim()).toEqual(expectedCode);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
