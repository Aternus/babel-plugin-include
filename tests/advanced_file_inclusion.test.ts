import path from 'path';
import {promises as fs} from 'fs';
import {transform} from '@babel/core';

import babelPluginInclude from '../src/index';

describe('babel-plugin-include', () => {
  it('handles multiple includes in a single line and separated by newline', async () => {
    const code = `include("fixtures/a_javascript.js");include("fixtures/b_javascript.js")\n`;
    const aFileContent = await fs.readFile(
      path.resolve(__dirname, './fixtures/a_javascript.js'),
      'utf-8',
    );
    const bFileContent = await fs.readFile(
      path.resolve(__dirname, './fixtures/b_javascript.js'),
      'utf-8',
    );
    const expectedCode = `${aFileContent}${bFileContent}`;

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
