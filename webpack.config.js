// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  // Tell webpack to start bundling our app at app/index.js
  entry: {
    NavBarLoggedOut: path.join(__dirname, 'src', 'client', 'components', 'NavBarLoggedOut'),
    NavBarLoggedIn: path.join(__dirname, 'src', 'client', 'components', 'NavBarLoggedIn'),
    home: path.join(__dirname, 'src', 'client', 'views', 'LandingView.js'), 
    login: path.join(__dirname, 'src', 'client', 'views', 'LoginView.js'),
    signup: path.join(__dirname, 'src', 'client', 'views', 'SignupView.js'),
    vendors: ['react']
  },
  // Output our app to the public/ directory
  output: {
    filename: 'bundles/[name].bundle.js',
    path: path.join(__dirname, 'public')
  },
  // Emit source maps so we can debug our code in the browser
  devtool: 'source-map',
  // Tell webpack to rdfdfasdfasdfafasdfasdfun our source code through Babel
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      { test: /\.css$/, 
        loader: "style-loader!css-loader",
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "file-loader?name=./fonts/[hash].[ext]"
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          template : './src/server/views/home.pug',
          filename: './views/home.html',
          inject   : false
    }),
      new HtmlWebpackPlugin({
          template : './src/server/views/login.pug',
          filename: './views/login.html',
          inject   : false
    }),
      new HtmlWebpackPlugin({
          template : './src/server/views/signup.pug',
          filename: './views/signup.html',
          inject   : false
    })
  ]
}