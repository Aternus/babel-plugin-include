import path from 'path';
import {transform} from '@babel/core';

import babelPluginInclude from '../src/index';

const relativePathToDummyFile = 'fixtures/basic_javascript.js';
const absolutePathToDummyFile = path.resolve(
  __dirname,
  relativePathToDummyFile,
);
const dummyFileContent = 'const x = 10;';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  readFileSync: jest.fn().mockImplementation((path, encoding) => {
    if (path === absolutePathToDummyFile) {
      return dummyFileContent;
    }

    return jest.requireActual('fs').readFileSync(path, encoding);
  }),
}));

describe('babel-plugin-include', () => {
  it('replaces include(pathToFile) with the content of pathToFile', () => {
    const code = `include("${relativePathToDummyFile}");`;
    const expectedCode = dummyFileContent;

    const result = transform(code, {
      filename: __filename,
      plugins: [[babelPluginInclude]],
    });

    expect(result?.code?.trim()).toEqual(expectedCode);
  });

  afterAll(() => {
    // Restore the original fs.readFileSync function after running the tests
    jest.restoreAllMocks();
  });
});
