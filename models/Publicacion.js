const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Publicacion = new Schema({
  autor: { type: String},
  info: { type: String},
  idPublic:{type:String, required:true},
  names: {type: String},
  reaction: {type: Array, default:[]},
  fecha:{type:String},
  imgPublicacion: {type: String}
});

const Publicaciones = mongoose.model("Publicacion", Publicacion);

module.exports = Publicaciones;
