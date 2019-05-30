const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  plugins: [
    new MonacoWebpackPlugin({
      languages: [
        'apex',
        'css',
        'html',
        'javascript',
        'json',
        'scss',
        'sql',
        'typescript',
        'xml'
      ]
    })
  ]
};
