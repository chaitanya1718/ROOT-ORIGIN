const express = require("express");
const {
  getUserProfile,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.post("/address", protect, addUserAddress);
router.put("/address/:addressId", protect, updateUserAddress);
router.delete("/address/:addressId", protect, deleteUserAddress);



module.exports = router;
