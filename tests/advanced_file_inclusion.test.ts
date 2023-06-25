import path from 'path';
import {transform} from '@babel/core';

import babelPluginInclude from '../src/index';

const relativePathToAFile = 'fixtures/a_javascript.js';
const absolutePathToAFile = path.resolve(__dirname, relativePathToAFile);
const aFileContent = 'const a = 10;';

const relativePathToBFile = 'fixtures/b_javascript.js';
const absolutePathToBFile = path.resolve(__dirname, relativePathToBFile);
const bFileContent = 'const b = 20;';

jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  readFileSync: jest.fn().mockImplementation((path, encoding) => {
    if (path === absolutePathToAFile) {
      return aFileContent;
    } else if (path === absolutePathToBFile) {
      return bFileContent;
    }

    return jest.requireActual('fs').readFileSync(path, encoding);
  }),
}));

describe('babel-plugin-include', () => {
  it('handles multiple includes in a single line and separated by newline', () => {
    const code = `include("${relativePathToAFile}");include("${relativePathToBFile}");\n`;
    const expectedCode = `${aFileContent}\n${bFileContent}`;

    const result = transform(code, {
      filename: __filename,
      plugins: [[babelPluginInclude]],
    });

    expect(result?.code?.trim()).toEqual(expectedCode);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
