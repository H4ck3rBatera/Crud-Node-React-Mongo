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

npm run dev
```

## [MATERIAL-UI](https://material-ui.com/ "MATERIAL-UI")
[React Templates](https://material-ui.com/getting-started/templates/ "React Templates")

## swagger.js
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
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server");
});

```

[1]: https://material-ui.com/ "MATERIAL-UI"
