const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const environment = require("../../common/environment");
const paginate = require("mongoose-paginate");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 5
  },

  email: {
    type: String,
    required: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },

  password: {
    type: String,
    required: true,
    unique: true,
    select: false
  },

  gender: {
    type: String,
    required: false,
    enum: ["M", "F"]
  },

  cpf: {
    type: String,
    required: false,
    unique: true
  }
});

const saveMiddleware = async function(next) {
  //important to use function insted arrow function to pickup the context
  if (!this.isModified("password")) {
    next();
  } else {
    this.password = await bcrypt.hash(
      this.password,
      environment.securiy.saltrounds
    );
    next();
  }
};

const updateMiddleware = async function(next) {
  if (!this.getUpdate().password) {
    next();
  } else {
    this.getUpdate().password = await bcrypt.hash(
      this.getUpdate().password,
      environment.securiy.saltrounds
    );
    next();
  }
};

UserSchema.pre("save", saveMiddleware);
UserSchema.pre("findOneAndUpdate", updateMiddleware);

UserSchema.plugin(paginate);

mongoose.model("User", UserSchema);
