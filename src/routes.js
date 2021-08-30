const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/userController");

routes.post("/api/users", UserController.create);

module.exports = routes;
