const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    measure: {
      value: {
        type: Number,
        required: true, // e.g. 500
      },
      unit: {
        type: String,
        enum: ["g", "kg", "ml", "l", "pcs"],
        required: true,
      },
    },


    tag: {
      type: String,
      enum: ["dairy", "sweets", "frozen", "refreshments", "snacks","ice-creams","dry-fruits","namkeen"],
      required: true,
    },
isBulkProduct: {
  type: Boolean,
  default: false,
},

minBulkQty: {
  type: Number,
  default: 1,
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
