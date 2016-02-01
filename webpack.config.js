var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/featherNote.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
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
    ],
    // Shut off warnings about using pre-built javascript files
    // as Quill.js unfortunately ships one as its `main`.
    noParse: /node_modules\/quill\/dist/
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", '.jsx']
  }
};
