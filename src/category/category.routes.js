const attributeController = require("../category/category.controller");
const express = require("express");
const router = express.Router();

router.post("/", attributeController.create);
router.get("/", attributeController.findAll);
router.get("/:id", attributeController.findOne);
router.get("/search/:keyword", attributeController.search);
router.put("/update/:id", attributeController.update);
router.delete("/:id", attributeController.delete);
router.delete("/del/:id",attributeController.del);
module.exports = router;