const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
    mode: 'development',
    target: 'web',
    devtool: 'eval',
    cache: true,
    entry: ['react-hot-loader/patch', './lib/index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
        globalObject: 'this',
        pathinfo: false
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        unsafeCache: true,
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'happypack/loader'
            },
            {
                test: /\.worker\.js$/,
                exclude: /node_modules/,
                loader: 'worker-loader',
                options: {
                    inline: true,
                    fallback: false
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader'
            }
        ]
    },
    devServer: {
        disableHostCheck: true,
        inline: true,

        hot: true,
        host: '0.0.0.0',
        historyApiFallback: true,
        compress: true,
        port: 3100,
        progress: true,
        allowedHosts: [''],
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['output']),
        new HardSourceWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new HappyPack({
            // 3) re-add the loaders you replaced above in #1:
            loaders: [
                {
                    loader: 'babel-loader?cacheDirectory'
                }
            ],
            verbose: false
        }),
        new CopyWebpackPlugin([
            { from: './static', to: 'static' },
            {
                from: './vscode/source/worker',
                to: 'worker'
            },
            { from: './vscode/source/vs', to: 'vs' },
            {
                from: './vscode/source/extensions',
                to: 'extensions'
            }
        ]),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|cn/)
    ],
    optimization: {
        minimize: false,
        removeEmptyChunks: false,
        mergeDuplicateChunks: false,
        splitChunks: false
    }
};
