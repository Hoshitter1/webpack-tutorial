const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "none",
  module: {
    rules: [
      {
        test: /\.js$/,
        //   Which file should be affected by the rule
        loader: "babel-loader",
        // which loader should be used to load the files specified in test section
        exclude: /node_modules/,
        // we don't need all node_modules to be included
      },
      {
        test: /\.css$/,
        //   Which file should be affected by the rule
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local__[hash:base64:5]]",
                //  How these unque class name should be generated in css module
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [autoprefixer()],
              // This will picke browserslist in package.json so it can tell which browser should support
            },
          },
          //   This helps transform css to work in old browser
        ],
        // because we need two loaders for css file, use use property
        // css loader loads css that imported in jsx files
        // style loader injects css file into html file
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        //   Which file should be affected by the rule
        loader: "url-loader?limit=8000&name=images/[name].[ext]",
        // which loader should be used to load the files specified in test section
        exclude: /node_modules/,
        // we don't need all node_modules to be included
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      inject: "body",
    }),
  ],
};
