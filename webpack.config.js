
const path = require("path")

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    index: path.join(__dirname, "src/index.ts"),
  },
  devtool: false,
  output: {
    path: path.join(__dirname, "dist/"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
