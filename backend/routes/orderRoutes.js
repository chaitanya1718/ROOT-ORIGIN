const express = require("express");
const { placeOrder,getMyOrders,getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { generateInvoice } = require("../controllers/invoiceController");
const router = express.Router();



// Invoice download (user + admin)


router.post("/", protect, placeOrder);
router.get("/my", protect, getMyOrders);


router.get("/", protect, adminOnly, getAllOrders);
router.get("/all", protect, adminOnly, getAllOrders);

router.put("/:id/status", protect, adminOnly, updateOrderStatus);
router.get("/:id/invoice", protect, generateInvoice);

module.exports = router;
