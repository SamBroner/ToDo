const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = env => {
    const htmlTemplate = "./src/index.html";

    return {
        devtool: "inline-source-map",
        entry: {
            app: "./src/app.tsx",
            main: "./src/container.tsx",
        },
        mode: "development",
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: "ts-loader"
            }]
        },
        output: {
            filename: "[name].bundle.js",
            library: "[name]",
            devtoolNamespace: "todoApp",
            libraryTarget: "umd",
        },
        plugins: [
            new HtmlWebpackPlugin({ template: htmlTemplate }),
            new Dotenv()
        ],
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },
    }
}