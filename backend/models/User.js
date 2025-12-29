const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isPremiumMember:{
      type:Boolean,
      default:false
    },

    mobile: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    addresses: [
      {
        name: String,
        mobile: String,
        street: String,
        city: String,
        hno: {
          type: String,
          required: true,
        },
        pincode: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    resetPasswordToken: String,
resetPasswordExpire: Date,
  },
  { timestamps: true }
);

// hash password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
