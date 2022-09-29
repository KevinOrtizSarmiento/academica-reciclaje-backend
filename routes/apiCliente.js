const { Router } = require("express");
const controladorCliente = require("../controllers/clienteController")
const router = Router();

router.get("/obtener", controladorCliente.obtener);
router.get("/obtener/:id", controladorCliente.buscar)
router.put("/update/user/:id", controladorCliente.update);
module.exports = router;