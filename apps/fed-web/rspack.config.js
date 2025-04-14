const { resolve } = require("path");
const { rspack } = require("@rspack/core");

module.exports = {
  entry: {
    main: "./apps/fed-web/src/route.ts"
  },
  externalsType: "commonjs",
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: {
          loader: "builtin:swc-loader",
          options: {
            jsc: {
              parser: {
                decorators: true,
                syntax: "typescript"
              }
            },
            sourcemap: true
          }
        }
      }
    ]
  },
  plugins: [
    new rspack.HtmlRspackPlugin()
  ],
  output: {
    path: resolve(process.cwd(), "dist/fed-web")
  },
  resolve: {
    extensions: [".js", ".ts", ".json"]
  },
  target: "node"
};
