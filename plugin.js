const pluginName = "boom";

export class BoomPlugin {
  apply(compiler) {
    const { webpack } = compiler;
    const { RuntimeGlobals, Template } = webpack;

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.runtimeRequirementInTree
        .for(RuntimeGlobals.ensureChunkHandlers)
        .tap(pluginName, (chunk, set) => {
          set.add(RuntimeGlobals.ensureChunkHandlers);
          compilation.addRuntimeModule(chunk, new RuntimeModule())
        });
    })

    class RuntimeModule extends webpack.RuntimeModule {
      constructor() {
        super("boom", 10);
      }

      generate() {
        const { runtimeTemplate } = this.compilation;
        return Template.asString([
          `${RuntimeGlobals.ensureChunkHandlers}.boom = ${runtimeTemplate.basicFunction("chunkId, promises", [
            "// Simulate chunk loading failure",
            "if (chunkId === 'src_split_js') {",
            "promises.push(Promise.reject('BOOM!' + chunkId));",
            "}"
          ])
          }`
        ])
      }
    }
  }
}
