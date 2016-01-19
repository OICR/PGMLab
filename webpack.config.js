module.exports = {
  context: __dirname + '/src',
  entry: './entry.js',
  output: {
    filename: 'js/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?stage=0'
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
        loader: 'babel' // The module to load. "babel" is short for "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [ '', '.js' ],
    alias: {
                'jquery.ui.widget': 'blueimp-file-upload/jquery.ui.widget'
            }
  },
"browser": { "fs": false }
}
