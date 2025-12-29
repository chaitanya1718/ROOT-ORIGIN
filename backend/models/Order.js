const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      price: Number,
      discount: { type: Number, default: 0 },
      discountedPrice: Number,
      quantity: { type: Number, required: true },
      tag: String,
    },
  ],
  subtotal: { type: Number, required: true },
  deliveryFee: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  address: { name: String, mobile: String, hno: String, street: String, city: String, pincode: String },
  paymentMethod: { type: String, enum: ["COD","UPI","CARD"], default: "COD" },
  paymentStatus: { type: String, enum: ["pending","paid"], default: "pending" },
  orderStatus: { type: String, enum: ["placed","shipped","delivered","cancelled"], default: "placed" },
  orderType: { type: String, enum: ["NORMAL","BULK"], default: "NORMAL" },
  eventType: { type: String },
  isReturnEligible: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
