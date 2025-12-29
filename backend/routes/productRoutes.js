const express = require("express");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

router.get("/", async (req, res) => {
  const filter = {};

  if (req.query.bulk === "true") {
    filter.isBulkProduct = true;
  }

  const products = await Product.find(filter);
  res.json(products);
});






module.exports = router;
