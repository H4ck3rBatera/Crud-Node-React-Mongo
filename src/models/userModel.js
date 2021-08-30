const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const DataSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
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
});

const users = mongoose.model("Users", DataSchema);
module.exports = users;