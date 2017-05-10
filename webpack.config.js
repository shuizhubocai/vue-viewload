var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        "app1": path.join(__dirname, './demo/src/app1.js'),
        "app2": path.join(__dirname, './demo/src/app2.js'),
        "app3": path.join(__dirname, './demo/src/app3.js'),
        "app4": path.join(__dirname, './demo/src/app4.js'),
        "app5": path.join(__dirname, './demo/src/app5.js')
    },
    output: {
        path: path.join(__dirname, './demo/dist'),
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
                warnings: false/*,
                drop_console: true,
                drop_debugger: true*/
            }
        })
    ],
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    }
}
