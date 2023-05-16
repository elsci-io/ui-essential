const path = require('path');

module.exports = {
    entry: ['./index.js', './style.scss'],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname),
    },
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'bundle.css'
                },
                use: ['sass-loader'],
            },
        ],
    },
    devtool: "source-map"
};

