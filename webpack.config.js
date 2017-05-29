var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
    filename: "style.css"
})

module.exports = {
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
        extractPlugin
    ],
    devServer: {
        historyApiFallback: true        /* History API will fall back to index.html
                                            resolves Cannot GET /[page_name] */
    }
}
