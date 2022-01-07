const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
     mode: "production",
     entry: "./src/app.ts",
     output: {
          filename: "bundle.js",
          path: path.resolve(__dirname, "dist"),
     },
     devServer: {
          static: {
               directory: path.join(__dirname, "/"),
          },
     },

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
     plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
