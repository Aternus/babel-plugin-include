import path from 'path';
import {promises as fs} from 'fs';
import {transform} from '@babel/core';

import babelPluginInclude from '../src/index';

describe('babel-plugin-include', () => {
  it('replaces include("relativePathToFile") with the content of pathToFile', async () => {
    const code = 'include("./fixtures/a_javascript.js");';
    const expectedCode = await fs.readFile(
      path.resolve(__dirname, './fixtures/a_javascript.js'),
      'utf-8',
    );

    const result = transform(code, {
      filename: __filename,
      plugins: [[babelPluginInclude]],
    });

    expect(result?.code?.trim()).toEqual(expectedCode.trim());
  });

  it('replaces include("absolutePathToFile") with the content of pathToFile', async () => {
    const absolutePathToFile = path.resolve(
      __dirname,
      './fixtures/a_javascript.js',
    );
    const code = `include("${absolutePathToFile}");`;
    const expectedCode = await fs.readFile(
      path.resolve(__dirname, './fixtures/a_javascript.js'),
      'utf-8',
    );

    const result = transform(code, {
      filename: __filename,
      plugins: [[babelPluginInclude]],
    });

    expect(result?.code?.trim()).toEqual(expectedCode.trim());
  });

  it('uses root option and relative path to include file', async () => {
    const rootDir = path.resolve(__dirname, './fixtures');
    const code = 'include("a_javascript.js");';
    const expectedCode = await fs.readFile(
      path.resolve(__dirname, './fixtures/a_javascript.js'),
      'utf-8',
    );

    const result = transform(code, {
      filename: __filename,
      plugins: [[babelPluginInclude, {root: rootDir}]],
    });

    expect(result?.code?.trim()).toEqual(expectedCode.trim());
  });

  it('reads files using the provided encoding', async () => {
    const code = 'include("./fixtures/a_javascript.js");';
    const expectedCode = await fs.readFile(
      path.resolve(__dirname, './fixtures/a_javascript.js'),
      'utf-8',
    );

    const result = transform(code, {
      filename: __filename,
      plugins: [[babelPluginInclude, {encoding: 'latin1'}]],
    });

    expect(result?.code?.trim()).toEqual(expectedCode?.trim());
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
