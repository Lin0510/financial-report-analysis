module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/financial-report-analysis/" : "/",
  devServer: {
    proxy: {
      "/api": {
        target: "https://cors-anywhere.herokuapp.com/https://www.morningstar.com",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/stocks",
        },
      },
    },
  },
};
