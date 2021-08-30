const UserModel = require("../models/userModel");

module.exports = {
  async details(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.findOne({ _id: id });
      res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
  },
  async index(req, res) {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
  },
  async create(req, res) {
    const { name, email, password } = req.body;
    let user = UserModel.findOne({ email });
    try {
      if (!user) {
        let data = { name, email, password };
        user = await UserModel.create(data);
        return res.status(200).json(user);
      } else {
        return res.status(400).json(user);
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
  },
};
