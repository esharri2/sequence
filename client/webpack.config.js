const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: 'babel-loader' },
            { test: /\.(s*)css$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
    })],
    mode: "development",
    devServer: {
        proxy: {
            "/": "http://localhost:3000"
        }
    }
}