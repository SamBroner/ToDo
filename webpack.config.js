const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
    const htmlTemplate = "./src/index.html";

    return {
        devtool: "inline-source-map",
        entry: "./src/app.tsx",
        mode: "development",
        module: {
            rules: [{
                test: /\.tsx?$/,
                loader: "ts-loader"
            }]
        },
        output: {
            filename: "[name].[contenthash].js",
        },
        plugins: [
            new HtmlWebpackPlugin({ template: htmlTemplate }),
        ],
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        }
    }
}