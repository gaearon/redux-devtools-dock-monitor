'use strict';

var webpack = require('webpack');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var reduxDevToolsExternal = {
  root: 'ReduxDevTools',
  commonjs2: 'redux-devtools',
  commonjs: 'redux-devtools',
  amd: 'redux-devtools'
};

module.exports = {
  externals: {
    'react': reactExternal,
    'redux-devtools': reduxDevToolsExternal
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'ReduxDevToolsDockMonitor',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  }
};