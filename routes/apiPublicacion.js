const { Router } = require("express");
const multer = require("../utils/multer")
const controladorPost = require("../controllers/postController");
const router = Router();

router.put(
  "/upload/profile/image/:id/:idPublic",
  multer.single("image"),
  controladorPost.put
);
router.post("/upload/image", multer.single("image"), controladorPost.upload);
router.get("/get/image", controladorPost.get);
router.delete("/delete/image/:id/:idPublic", controladorPost.delete);
module.exports = router;
