const app = require("./src/server/app");
const http = require("http");
const environment = require("./common/environment");

const server = http.createServer(app);
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

try {
  mongoose.connect(environment.db.url, { useNewUrlParser: true }).then(() => {
    server.listen(environment.server.port, () => {
      console.log(`Server is running on port ${environment.server.port}`);
    });
  });
} catch (e) {
  process.exit(1);
}
