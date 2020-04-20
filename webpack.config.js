const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  plugins: [
    new CopyPlugin([{ from: "../views", to: "views" }])
  ]
};
