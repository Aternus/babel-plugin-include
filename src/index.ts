import fs from 'fs';
import nodePath from 'path';

import {BabelCore, CustomNodePath, CustomPlugin} from './types';
import {FileNotFoundError} from './errors';

function BabelPluginInclude(babel: BabelCore): CustomPlugin {
  const {types} = babel;
  return {
    name: 'babel-plugin-include',
    visitor: {
      CallExpression(path: CustomNodePath, state) {
        if (path.node.callee.name === 'include') {
          const root = state.opts.root || nodePath.dirname(state.filename);
          const encoding = state.opts.encoding || 'utf8';

          const [filePathArg] = path.node.arguments;

          if (filePathArg && types.isStringLiteral(filePathArg)) {
            const includedFileName = filePathArg.value;
            const pathToIncludedFile = nodePath.resolve(root, includedFileName);

            let fileContent;
            try {
              fileContent = fs.readFileSync(pathToIncludedFile, encoding);
            } catch (e) {
              throw new FileNotFoundError(pathToIncludedFile);
            }

            const {ast} = babel.transformSync(fileContent, {
              ast: true,
              filename: pathToIncludedFile,
              configFile: false, // disable the use of babel config
              plugins: [[BabelPluginInclude, state.opts]], // enable recursive use of include()
            });
            path.replaceWithMultiple(ast.program.body);
          }
        }
      },
    },
  };
}

export default BabelPluginInclude;
