const path = require('path')

module.exports = {
  entry: './plopfile.js',
  node: {
    fs: 'empty',
    __dirname: true,
    __filename: true,
  },
  context: path.resolve(__dirname),
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                '@babel/preset-env',
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: 'plopfile.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
}

