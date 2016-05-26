var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: __dirname + "/src",
  entry: {
     //"pgmlab": "./pgmlab.entry.jsx",
     "pgmbio": "./pgmbio.entry.js"
  },
  output: {
    path:    path.join(__dirname, "js"),
    filename: "[name].bundle.js"
  },
  loader: "babel",
  devtool: "source-map",
  // Prevent bufferutil, utf-8-validate warnings
  externals: ['ws'],
  module: {
    noParse: ['ws'],
    loaders: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /autobahn\/package.json$/,
        loader: 'json-loader'
      },
      { test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /d3-svg-legend/,
        loader: "imports?d3=d3"
      },
      { test: /d3-tip/,
        loader: "imports?define=>false"
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      },
      {
        test: /\.(js|jsx)$/, // A regexp to test the require path. accepts either js or jsx
        exclude: /(node_modules)/,
        loader: "babel", // The module to load. "babel" is short for "babel-loader"
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /[\/\\]node_modules[\/\\]some-module[\/\\]index\.js$/,
        loader: "imports?this=>window"
      }
    ],
    exprContextCritical: false              // Otherwise I get "the request of a dependency is an expression" error
                                            // Solution here: https://github.com/webpack/webpack/issues/918
  },
  resolve: {
    extensions: [ "", ".js" ],
    modulesDirectories: ["node_modules"],
    alias: {
                "jquery.ui.widget": "blueimp-file-upload/jquery.ui.widget"
            }
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
    bufferutil: "empty"
  }
}
