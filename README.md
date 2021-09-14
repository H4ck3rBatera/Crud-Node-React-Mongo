# Crud-Node-React-Mongo
> NodeJS + ReactJS + MongoDB

## Dependencies - API
```shell
npm i express
npm i cookie-parser
npm i cors
npm i path
npm i nodemon -d
npm i mongoose
npm i bcrypt
npm install -g create-react-app
npm i concurrently -d

npm run dev
```

## Dependencies | Swagger
```shell
npm install --save-dev swagger-autogen
npm install swagger-ui-express

npm run swagger-autogen
```

## Dependencies - Client
```shell
npm i @material-ui/core
npm i @material-ui/icons
npm i react-router-dom
npm i axios

npm run dev
```

## [MATERIAL-UI](https://material-ui.com/ "MATERIAL-UI")
[React Templates](https://material-ui.com/getting-started/templates/ "React Templates")

## BackendBackend
### Models
```javascript
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const DataSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

DataSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const users = mongoose.model("Users", DataSchema);
module.exports = users;
```
### Controllers
```javascript
const UserModel = require("../models/userModel");

module.exports = {
  async create(req, res) {
    const { name, email, password } = req.body;
    try {
      let user = await UserModel.findOne({ email });

      if (!user) {
        const data = { name, email, password };
        user = await UserModel.create(data);
        user.password = undefined;
        return res.status(200).json(user);
      } else {
        return res.status(400).json(user);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  },
  async delete(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.findByIdAndDelete({ _id: id });
      if (!user) return res.status(404).send(id);
      res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  },
  async details(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.findOne({ _id: id });
      if (!user) return res.status(404).send(id);
      res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  },
  async index(req, res) {
    try {
      const users = await UserModel.find().sort({name: 'asc'});
      res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  },
  async update(req, res) {
    const { id, name, email, password } = req.body;
    const data = { name, email, password };
    try {
      const user = await UserModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (!user) return res.status(404).send(id);
      res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  },
};

```
### Routes
```javascript
const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/userController");

routes.get("/api/users/:id", UserController.details);
routes.get("/api/users", UserController.index);
routes.post("/api/users", UserController.create);
routes.delete("/api/users/:id", UserController.delete);
routes.put('/api/users',UserController.update);

module.exports = routes;

```
### Docker-compose
```yaml
version: "3"

services:
  mongo:
    image: mongo
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: Yu-Gi-Oh!
    ports:
      - "27017:27017"
    networks:
      - mongo-compose-network

networks:
  mongo-compose-network:
    driver: bridge

```
### Swagger
```javascript
const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routes"];

const doc = {
  info: {
    version: "1.0.0",
    title: "Crud-Node-React-Mongo",
    description: "Documentation | Crud-Node-React-Mongo",
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server");
});
```

## Frontend
### Services
```javascript
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000",
});

```
### Pages
```javascript
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import api from "../../services/api";

export default function UserCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit() {
    const data = {
      name: name,
      email: email,
      password: password,
    };

    if (name !== "" && email !== "" && password !== "") {
      try {
        const response = await api.post("/api/users", data);

        if (response.status === 200) {
          window.location.href = "/user";
        } else {
          alert(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Required!");
    }
  }

  return (
    <Container maxWidth="lg">
      <h2>Create User</h2>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="E-mail"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            To save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

```

[1]: https://material-ui.com/ "MATERIAL-UI"
