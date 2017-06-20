# React Webpack2
Setup Webpack2 and React:

- Webpack Dev Server
- CSS and SCSS Loaders
- Templates
- Multi Bundle
- Hash Bundle
- React
- Hot Reload
- Hot Module Replacement
- Load Images
- Optimize Images
- Remove unused selectors from your CSS

## First Steps - Get it running
```sh
# install global
$ npm i -D -g webpack@2.2.0

# Command Line
$ webpack src/index.js ./dist/public/bundle.js

# From NPM
$ webpack -d --watch --config ./webpack.config.dev
```

## Generate a HTML file
The plugin will generate an HTML5 file for you that includes all your webpack bundles in the body using script tags.
```sh
# install
$ npm i -D html-webpack-plugin
```
File: webpack.config.dev.js
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
```
This will generate a file: dist/index.html

## HTML Template
Create a file: index.ejs

```javascript
// ...
    new HtmlWebpackPlugin({  // Also generate a test.html
      title: 'Webpack2 Tut',
      minify: {
        collapseWhitespace: true
      },
      hash: true, // add a hash to bundle name
      template: './src/assets/index.ejs'
    })
... //
};
```
Create a file: src/assets/index.ejs
```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```

## Configure Loaders
Loaders is a function that takes for example the css file path and includes in the final bundle.
```sh
# Install a loader to include css in a bundle
$ npm i -D css-loader
```
Now the bundle has the style, but the browsers dont use javscript files as CSS. So we need the style-loader to let browsers understand the style inside the javascript bundle.

```sh
# Install a loader to include css in a bundle
$ npm i -D style-loader

# Install a sass loader
$ npm i -D sass-loader node-sass
```
Add this to the config file
```javascript
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  }
```
## Generate a style file to dist folder
This plugin can extract the style in to a single file.
```sh
$ npm i -D extract-text-webpack-plugin
```

```javascript
rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '/dist'
        })
      },

//...
  plugins: [
//...
    new ExtractTextPlugin({
      filename: 'bundle.css',
      disable: false,
      allChunks: true
    })
```

## Configure Webpack Dev Server

```sh
$ npm i -D webpack-dev-server@2.2.0
```

change webpack.config to include absolute path
```javascript
const path = require('path');
//...
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
```

configure dev server

```javascript
// ... after module
  devServer: {
    hot: false,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3030,
    stats: 'errors-only',
    open: true
  },

```

## React

### Install React and Babel
```sh
# React dependencies
$ npm i -S react react-dom
# ES6 e JSX
$ npm i -D babel babel-preset-react babel-preset-es2015

```
### Enable presets
Create a file: .babelrc
```json
{
  "presets": ["es2015","react"]
}

```

### Add rule for all js files to use a babel loader
```sh
$ npm i -D babel-loader babel-core
```
```javascript
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  },
```
## Setup Hot Module Replacement
HMR allow to add changes to css without page refresh
```javascript
const webpack = require('webpack');

// Change Only em dev mode this:
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },


//...
  devServer: {
    hot: true, // set to true

    //...
  new ExtractTextPlugin({
    filename: 'bundle.css',
    disable: true, // <- disable true
    allChunks: true
  }),
//....
// Add:
  new webpack.HotModuleReplacementPlugin(),  // enable HMR globally
  new webpack.NamedModulesPlugin() // prints more readable module names in the browser console on HMR updatesm 
```

## Load Images width Webpack
```
$ npm i -D file-loader
```

## Optimize Images
```
$ npm i -D image-webpack-loader@3.2.0
```

## Purify Css
This plugin uses PurifyCSS to remove unused selectors from your CSS. You should use it with the extract-text-webpack-plugin.

```
$ npm i -D purifycss-webpack
```

```javascript
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    // Make sure this is after ExtractTextPlugin!
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'app/*.html')),
    })
  ]
};


```

