const routes = require("express").Router();
const requireDir = require("require-dir");
const authentication = require("../security/authentication");

requireDir("../models");

const UserController = require("../controller/UserController");

//user routes operations
routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);
//authenticate user route
routes.post("/users/authenticate", UserController.authenticate);

routes.use(authentication);

module.exports = routes;
