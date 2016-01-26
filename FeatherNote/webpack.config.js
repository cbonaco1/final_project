var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/featherNote.jsx",
  output: {
    path: path.name(__dirname, 'app', 'assests', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", '.jsx']
  }
};
