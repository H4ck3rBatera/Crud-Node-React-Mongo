const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/userController");

routes.get("/api/users/:id", UserController.details);
routes.get("/api/users", UserController.index);
routes.post("/api/users", UserController.create);
routes.delete("/api/users/:id", UserController.delete);
routes.put('/api/users',UserController.update);

module.exports = routes;
