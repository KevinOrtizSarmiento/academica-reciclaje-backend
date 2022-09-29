const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Usuarios = new Schema({
  name: { type: String, required: true},
  last: { type: String, required: true},
  tel: {type: String},
  email: { type: String, required: true },
  password: { type: String, required: true },
  imgProfile: {type: String, required: true},
  idPublic:{type:String, default: "example"}
});

const User = mongoose.model("Persons", Usuarios);

module.exports = User;
