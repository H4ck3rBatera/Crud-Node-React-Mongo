const UserModel = require("../models/userModel");

module.exports = {
  index(req, res) {
    res.json({ message: "oi test" });
  },
  async create(req, res) {
    const { name, email, password } = req.body;
    let data = {};
    let user = UserModel.findOne({ email });

    if (!user) {
      data = { name, email, password };
      user = await UserModel.create(data);
      return res.status(200).json(user);
    } else {
      return res.status(500).json(user);
    }
  },
};
