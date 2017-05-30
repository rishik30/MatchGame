const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')

const extractPlugin = new ExtractTextPlugin({
    filename: "style.css"
})

const definePlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
})

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
        screw_ie8: true,
        keep_fnames: true
    },
    compress: {
        screw_ie8: true
    },
    comments: false
})

module.exports = {
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2015", "stage-1", "react"]
                        }
                    }
                ],
                exclude: /(node_modules)/
            },
            {
                test: /\.scss/,
                use: extractPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            }
        ]
    },
    plugins: [
        extractPlugin,
        definePlugin,
        uglifyPlugin
    ],
    devServer: {
        historyApiFallback: true,        /* History API will fall back to index.html
                                        resolves Cannot GET /[page_name] */
    }
}
