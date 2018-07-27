// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  // Tell webpack to start bundling our app at app/index.js
  entry: {
    home: path.join(__dirname, 'src', 'client', 'views', 'LandingView.js'), 
    login: path.join(__dirname, 'src', 'client', 'views', 'LoginView.js'),
    signup: path.join(__dirname, 'src', 'client', 'views', 'SignupView.js'),
    userprofile: path.join(__dirname, 'src', 'client', 'views', 'UserProfile.js'),
    catalog: path.join(__dirname, 'src', 'client', 'views', 'CatalogView.js'),
    postitem: path.join(__dirname, 'src', 'client', 'views', 'PostItemView.js'),
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
          inject: false
    }),
      new HtmlWebpackPlugin({
          template : './src/server/views/login.pug',
          filename: './views/login.html',
          inject: false
    }),
      new HtmlWebpackPlugin({
          template : './src/server/views/signup.pug',
          filename: './views/signup.html',
          inject: false
    }),
      new HtmlWebpackPlugin({
          template: './src/server/views/userprofile.pug',
          filename: './views/userprofile.html',
          inject: false
    }),
      new HtmlWebpackPlugin({
          template : './src/server/views/catalog.pug',
          filename: './views/catalog.html',
          inject: false
    }),
      new HtmlWebpackPlugin({
          template: './src/server/views/postitem.pug',
          filename: './views/postitem.html',
          inject: false
    })
  ]
}