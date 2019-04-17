const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const auth = require("../security/auth");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;
    const users = await User.paginate({}, { page: page, limit: 5 });
    if (users) {
      return res.json(users);
    } else {
      res.status(500).send({ error: "Something went wrong" });
    }
  },

  async show(req, res) {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.json(user);
    } else {
      res.status(500).send({ error: "Something went wrong" });
    }
  },

  async store(req, res) {
    const data = req.body;
    if (data) {
      const user = await User.create(req.body);
      return res.json(user);
    } else {
      res.status(400).send({ error: "Something went wrong" });
    }
  },

  async update(req, res) {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });
    if (user) {
      return res.json(user);
    } else {
      res.status(400).send({ error: "Something went wrong" });
    }
  },

  async destroy(req, res) {
    const user = await User.findByIdAndRemove(req.params.id);
    return res.send({ message: "User deleted successfully" });
  },

  async authenticate(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || (await bcrypt.compare(password, user.password)))
      res.status(400).send({ error: "User not found or invalid password" });

    res.send({ user, token: auth.generateToken({ id: user.id }) });
  }
};
