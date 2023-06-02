
import * as webpack from "webpack";

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

const webpackConfig: webpack.Configuration = {
  // WARNING: MUST set the 'mode' manually because it isn't done by NX/NG cli
  mode,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ],
  },
  plugins: [
    // add custom plugins here
  ],
};

module.exports = webpackConfig;
