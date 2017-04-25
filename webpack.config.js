var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        "vue-viewload": path.join(__dirname, './src/vue-viewload.js')
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
            }
        })
    ],
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    }
}
