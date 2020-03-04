const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    node: {
        __dirname: true
    },
    entry: ['./styles/main.scss'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/')
    },
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('cssnano')({ preset: 'default' })
                            ],
                            minimize: true
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'thanatos.css',
            chunkFilename: "[id].css",
        }),
        new CopyPlugin([
            { from: 'dist/thanatos.css', to: '../css/thanatos.css' }
        ])
    ]
}