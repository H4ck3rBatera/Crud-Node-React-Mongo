const UserModel = require("../models/userModel");

module.exports = {
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
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).send(error);
    }
  },
  async create(req, res) {
    const { name, email, password } = req.body;
    try {
      let user = await UserModel.findOne({ email });
      if (!user) {
        let data = { name, email, password };
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
};
