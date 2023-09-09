const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    home: './src/home.js',
    signup: './src/signup.js',
    signin: './src/signin.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/js'),
  },
};
