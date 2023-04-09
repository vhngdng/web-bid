/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        host: '0.0.0.0',
        compress: true,
        http2: true,
        https: {
            key: fs.readFileSync(
                '/etc/letsencrypt/live/auctionforfun.site/private.key',
            ),
            cert: fs.readFileSync(
                '/etc/letsencrypt/live/auctionforfun.site/certificate.crt',
            ),
        },
        onListening: function (devServer) {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }

            const port = devServer.server.address().port;
            console.log('Listening on port:', port);
        },
    },
    allowedHost: ['auctionforfun.site'],
    client: {
        reconnect: 5,
        webSocketTransport: 'ws',
        webSocketURL: { hostname: undefined, pathname: undefined, port: '0' },
    },
    webSocketServer: 'ws',
};

//
