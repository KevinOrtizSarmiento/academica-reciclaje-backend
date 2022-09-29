const User = require("../models/Usuarios");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const time = 60 * 60 * 24;

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if(email.trim().length<=0 || password.trim().length<=0) return res.status(401).json("Completa todos los campos")
  try {
    const usuario = await User.findOne({ email: email });
    if(!usuario) return res.status(401).json("Correo y/o contraseña incorrectas")
    const current = await bcrypt.compare(password, usuario.password);
    if (current) {
      const generate = {
        id: usuario._id,
        rol: usuario.rol
      };
      const token = jwt.sign(generate, process.env.ACESS, { expiresIn: time });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: time * 1000,
        sameSite: "none",
        secure: true,
      });
      res
        .status(200)
        .json({
          _id:usuario._id,
          name: usuario.name,
          last:usuario.last,
          tel:usuario.tel,
          email: usuario.email,
          imgProfile: usuario.imgProfile,
          idPublic:usuario.idPublic
        });
    } else {
      res
        .status(401)
        .json("Correo y/o contraseña incorrectas");
    }
  } catch (error) {
    res
      .json("Correo y/o contraseña incorrectas");
  }
};
module.exports.register = async (req, res) => {
  const img =
    "https://res.cloudinary.com/academica/image/upload/v1642982779/Images/w3qtkbjgs6lxruvvpjza.png";
  const { name, last, tel, email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) return res.status(401).json("Este correo ya se encuentra reistrado");
  if(email.trim().length<=0 || password.trim().length<=0 || name.trim().length<=0 || last.trim().length<=0) return res.status(401).json("Completa todos los campos")
  try {
    const pass_encoded = await bcrypt.hash(password, salt);
    const usuario = await User.create({
      name:name,
      last:last,
      tel:tel,
      imgProfile:img,
      email,
      password: pass_encoded,
    });
    if(usuario) return res.status(200).json("Usuario registrado");
  } catch (error) {
    res.status(401).json("Hubo un error en el registro");
  }
};
module.exports.logout = (req, res) => {
  res.cookie("token", "", {
    sameSite: "none",
    secure: true,
    httpOnly: true,
    maxAge: 1,
  });
  res.status(200).json(null);
};
module.exports.info = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.ACESS, async (err, decodeToken) => {
      if (err) {
        res.status(401).json(null);
      } else {
        let user = await User.findById({ _id: decodeToken.id });
        res.status(200).json({
          _id:user._id,
          name: user.name,
          last: user.last,
          tel:user.tel,
          email: user.email,
          imgProfile: user.imgProfile,
          idPublic:user.idPublic,
        });
      }
    });
  } else {
    res.status(401).json(null);
  }
};
