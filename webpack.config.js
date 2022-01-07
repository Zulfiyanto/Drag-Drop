const path = require("path");

module.exports = {
     mode: "development",
     entry: "./src/app.ts",
     output: {
          filename: "bundle.js",
          path: path.resolve(__dirname, "dist"),
          publicPath: "/dist/",
     },
     devServer: {
          static: {
               directory: path.join(__dirname, "/"),
          },
     },
     devtool: "inline-source-map",
     module: {
          rules: [
               {
                    test: /\.ts$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
               },
          ],
     },
     resolve: {
          extensions: [".ts", ".js"],
     },
     performance: {
          hints: false,
          maxEntrypointSize: 512000,
          maxAssetSize: 512000,
     },
};
