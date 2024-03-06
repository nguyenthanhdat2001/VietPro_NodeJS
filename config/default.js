module.exports = {
  app: {
    port: 9000,
    router: `${__dirname}/../src/router/web`,
    public_folder: `${__dirname}/../src/public/`,
    view_folder: `${__dirname}/../src/apps/views/`,
    view_engine: "ejs",
    session_key: "My secret",
    tmp: `${__dirname}/../src/tmp`,
  },
};
