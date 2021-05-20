const path = require('path');

module.exports = {
    devServer: {
        port: '8080',
        hot: true,
        compress: true,
        contentBase: path.resolve(__dirname, './index.html'),
        watchContentBase: true,
        historyApiFallback: true,
        proxy: {
          '/login': {
            target: 'http://localhost:5000/'
          },
          '/signup': {
            target: 'http://localhost:5000/'
          },
          '/listings': {
            target: 'http://localhost:5000/'
          },
        }
    },
    entry: {
        server: path.resolve(__dirname, "./server/server.js")
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                {
                                    'plugins': ['@babel/plugin-proposal-class-properties']
                                }
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
}
