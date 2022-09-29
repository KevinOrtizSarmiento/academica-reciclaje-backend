const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports.Auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(404).send("Acceso Denegado");
  try {
    jwt.verify(token, process.env.ACESS, (err, user) => {
      if (err) return res.status(401).json({ auth: "error" });
      res.locals.user = user;
      next();
    });
  } catch (error) {
      res.status(404).send("Acceso Denegado")
  }
};
