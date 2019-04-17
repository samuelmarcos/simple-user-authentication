const environment = {
  server: { port: process.env.PORT || 3000 },
  db: { url: process.env.DB_URL || "mongodb://localhost/node-starter" },
  securiy: {
    saltrounds: process.env.SALT_ROUNDS || 10,
    secret: process.env.SECRET || "secretexampletotest"
  }
};

module.exports = environment;
