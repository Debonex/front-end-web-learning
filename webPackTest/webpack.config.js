const webpack = require("webpack");
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: "source-map",
    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: "./public",
        hot: true,
        port: '8081'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.BannerPlugin('Hello there.'),
        new HTMLWebpackPlugin({ title: "WebPack Test!", template: __dirname+'/app/index.tmpl.html' })
    ]
}