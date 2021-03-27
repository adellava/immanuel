const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry: [paths.src + '/index.tsx'],
  output: {
    filename: "[name].bundle.js",
    path: paths.build,
  },
  plugins: [
    new CleanWebpackPlugin({ 
        cleanStaleWebpackAssets: false
    }),
    new HtmlWebpackPlugin({
      title: 'Immanuel',
      template: paths.src + '/index.html'
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [paths.src, 'node_modules'],
  },
  module: {
    rules: [
       {
            test: /\.(ts|js)x?$/i,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      "useBuiltIns": "usage",
                      "corejs": 3,
                      "targets": "> 0.25%, not dead" 
                    }
                  ],
                  "@babel/preset-typescript",
                  "@babel/preset-react",
                ],
              },
            },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};