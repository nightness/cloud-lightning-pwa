const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      util: require.resolve("util/"),
      crypto: require.resolve("crypto-browserify"),
    },
  },
  //   entry: './src/index.js',
  //   output: {
  //     filename: 'bundle.js',
  //     path: path.resolve(__dirname, 'dist')
  //   }
};
