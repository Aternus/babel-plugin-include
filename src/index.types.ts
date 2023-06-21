import * as BabelCoreNS from '@babel/core';

declare global {
  function include(path: string): string;
}

export interface CustomPluginPass extends BabelCoreNS.PluginPass {
  opts: {
    root?: string;
    encoding?: string;
  };
}
