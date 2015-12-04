module.exports = {
  context: __dirname + '/src',
  entry: './entry.js',
  output: {
    filename: 'bundle.js'
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
        loader: "style!css" }
    ]
  },
  resolve: {
    extensions: [ '', '.js' ]
  }
}
