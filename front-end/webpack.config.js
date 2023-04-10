/* eslint-disable no-undef */
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        mime: {
            'application/javascript': ['js'],
            'text/css': ['css'],
        },
        contentBase: './dist',
        https: true,
        key: fs.readFileSync(
            '/etc/letsencrypt/live/auctionforfun.site/private.key',
        ),
        cert: fs.readFileSync(
            '/etc/letsencrypt/live/auctionforfun.site/certificate.crt',
        ),
    },
};
