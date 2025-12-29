const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    // 🔑 VERY IMPORTANT: user reference
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one cart per user
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        orderType: {
      type: String,
      enum: ["NORMAL", "BULK"],
      default: "NORMAL",
    },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
