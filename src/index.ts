import fs from 'fs';
import path from 'path';
import parser from '@babel/parser';
import * as BabelCoreNS from '@babel/core';
import { CustomPluginPass } from './index.types';

type BabelCore = typeof BabelCoreNS;

export default function (babel: BabelCore): BabelCoreNS.PluginObj<CustomPluginPass> {
  console.log({ babel });

  const { types: t } = babel;
  return {
    name: 'babel-plugin-include',
    visitor: {
      CallExpression(p, state) {
        // const name = p.node.callee.name;
        // const args = p.node.arguments;
        //
        // if (name === 'include') {
        //   // the first argument must be a string
        //   t.assertStringLiteral(args[0]);
        //
        //   // get the path of the invoking file
        //   const pathOfTheInvokingFile = this.file.opts.filename; // v7 and v6
        //
        //   // error checking
        //   if (pathOfTheInvokingFile === undefined) {
        //     throw new Error('The include function could not determine the path of the invoking file.');
        //   }
        //
        //   // calculate the root directory
        //   const root = state.opts.root || path.dirname(pathOfTheInvokingFile);
        //
        //   // set file encoding
        //   const encoding = state.opts.encoding || 'utf8';
        //
        //   // generate the full path to the file to be included
        //   const fileRelPath = args[0].value;
        //   const filePath = path.join(root, fileRelPath);
        //
        //   // read the file
        //   let fileSrc = fs.readFileSync(filePath, { encoding });
        //
        //   // if the file is a buffer, convert it to a string
        //   if (fileSrc instanceof Buffer) {
        //     fileSrc = fileSrc.toString(encoding);
        //   }
        //
        //   // parse the file to an AST
        //   let ast = parser.parse(fileSrc);
        //
        //   // take out the program body
        //   ast = ast.program.body;
        //
        //   // replace the include node with the ast of the included file
        //   p.replaceWithMultiple(ast);
        // }
      },
    },
  };
}
