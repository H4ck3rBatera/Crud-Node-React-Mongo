const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./src/routes");

const app = express();
const port = process.env.PORT || 5000;

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongoose.connect(
  "mongodb://root:Yu-Gi-Oh!@localhost:27017/",
  {
    dbName: "NodeReact",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("MongoDB OK!");
    }
  }
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(port, function () {
  console.log(`Server runing on port ${port}`);
});
