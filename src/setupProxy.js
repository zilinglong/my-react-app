const proxy = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    proxy("/api", {
      target: "http://39.102.71.229:8085/",
      changeOrigin: true
    })
  );
};
