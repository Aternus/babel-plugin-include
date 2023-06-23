import * as BabelCoreNS from '@babel/core';

export type BabelCore = typeof BabelCoreNS;

declare global {
  function include(path: string): void;
}

interface IncludedCallExpression extends BabelCoreNS.types.CallExpression {
  callee: BabelCoreNS.types.Identifier & {
    name: string;
  };
}

export type CustomNodePath = BabelCoreNS.NodePath<IncludedCallExpression>;

export interface CustomPluginPass extends BabelCoreNS.PluginPass {
  opts: {
    root?: string;
    encoding?: BufferEncoding;
  };
}

export type CustomPlugin = BabelCoreNS.PluginObj<CustomPluginPass>;
