const express = require("express");
const {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.put("/:productId", protect, updateQuantity);
router.delete("/:productId", protect, removeItem);

module.exports = router;
