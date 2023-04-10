/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
    },
    devServer: {
        mime: {
            'application/javascript': ['js'],
            'text/css': ['css'],
        },
        contentBase: './dist',
        historyApiFallback: true,
        http2: true,
        https: {
            key: '/etc/letsencrypt/live/auctionforfun.site/private.key',
            cert: '/etc/letsencrypt/live/auctionforfun.site/certificate.crt',
        },
        client: {
            webSocketURL: 'wss://auctionforfun.site:443/ws',
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
        }),
        new DefinePlugin({
            'process.env.WDS_SOCKET_PORT': 443,
        }),
    ],
};
