const { resolve } = require("path");

module.exports = {
	entry: {
		main: "./apps/fed/src/main.ts",
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
	output: {
		path: resolve(process.cwd(), "dist/fed")
	},
	resolve: {
		extensions: [".js", ".ts", ".json"]
	},
	target: "node"
};
