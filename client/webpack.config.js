const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
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
    plugins: [
        new HtmlWebpackPlugin({ template: 'src/index.html' })
    ],
    mode: "development",
    devServer: {
        proxy: {
            "/": "http://localhost:3000"
        }
    }
}

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }), //Sets process in compiled code
        new UglifyJsPlugin(), //minifies code
        new ManifestPlugin({ filename: 'asset-manifest-json' }), //creates asset manifest
        new CopyWebpackPlugin([{ from: 'src/pwa' }, //moves pwa stuff to dist file
        ])

    );

}

module.exports = config