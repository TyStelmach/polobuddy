const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const {
  NODE_ENV: nodeEnv = 'development'
} = process.env;
const devMode = nodeEnv !== "production";
const pkg = require("./package.json");

module.exports = {
  entry: {
    app: "./src/index.js",
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    filename: devMode ? "[name].js" : "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: devMode ? "[name].js" : "[name].[chunkhash].js",
    publicPath: "/"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all"
        }
      }
    }
  },
  devServer: {
    historyApiFallback: {
      index: "/index.html"
    }
  },
  watchOptions: {
    poll: true
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        use: {
          loader: "babel-loader"
        },
        resolve: {
          extensions: ['.js', '.jsx']
        }
      },
      {
        test: /\.scss|css$/,
        use: [
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: ["src/styles/"]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["vendor", "app"],
      template: path.join(__dirname, "public", "index.html")
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
      'process.env.API_PATH': JSON.stringify(process.env.API_PATH)
    })
  ]
};