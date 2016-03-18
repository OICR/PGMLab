var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: __dirname + "/src",
  entry: {
     "pgmlab": "./pgmlab.entry.js",
     "pgmbio": "./pgmbio.entry.js"
  },
  output: {
    path:    path.join(__dirname, "js"),
    filename: "[name].bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel?stage=0"
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
        test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
        loader: "babel" // The module to load. "babel" is short for "babel-loader"
      }
    ],
    exprContextCritical: false              // Otherwise I get "the request of a dependency is an expression" error
                                            // Solution here: https://github.com/webpack/webpack/issues/918
  },
  resolve: {
    extensions: [ "", ".js" ],
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
