const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniSccExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const getFilename = extention => isDev ? `[name].${extention}` : `[name].[hash].${extention}`;

module.exports = {
    devServer: {
        port: 8080,
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            }
        }), 
        new MiniSccExtractPlugin({
            filename: getFilename('css'),
        })
    ],

    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
        ],
    },
}