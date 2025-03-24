const express = require("express");
const multer = require("multer");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const productSchema = require("../validators/productValidator");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  protect,
  isAdmin,
  upload.single("image"),
  validate(productSchema),
  createProduct
);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, isAdmin, validate(productSchema), updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;
