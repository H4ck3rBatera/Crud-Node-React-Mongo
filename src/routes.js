const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/userController");

routes.get("/", UserController.index);
routes.post("/api/users", UserController.create);

module.exports = routes;
