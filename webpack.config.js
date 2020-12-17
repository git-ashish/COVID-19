const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'docs'),
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/assets/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        type: 'javascript/auto',
        test: /\.(json|png|fnt)$/,
        // test: /\.json$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: "[name].[ext]"
          }
        }
        ]
      }
    ]
  },
};