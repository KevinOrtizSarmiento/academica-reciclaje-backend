const Usuario = require("../models/Usuarios");

module.exports.obtener = async (req, res) => {
  await Usuario.find()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
};
module.exports.buscar = async (req, res) => {
  const { id } = req.params;
  await Usuario.findById({ _id: id })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
};
module.exports.update = async (req, res) => {
  const { id } = req.params;
  const { names, des } = req.body;
  if (names.trim().length > 0) {
    await Usuario.findByIdAndUpdate(
      { _id: id },
      { $set: { names: names, des: des } }
    )
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
