//Did not use import here since this file isn't going through babel
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
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
    })],
    mode: "development",
    devServer: {
        proxy: {
            "/api": "http://localhost:3000"
        }
    }
}