const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ================= ADD TO CART =================
// ================= ADD TO CART =================
const addToCart = async (req, res) => {
  const { productId, quantity, orderType } = req.body;
  const userId = req.user.id;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: userId });

  const finalQty =
    orderType === "BULK"
      ? Math.max(quantity || product.minBulkQty, product.minBulkQty)
      : quantity || 1;

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [
        {
          product: productId,
          quantity: finalQty,
          orderType: orderType || "NORMAL",
        },
      ],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (i) =>
        i.product.toString() === productId &&
        i.orderType === (orderType || "NORMAL")
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += finalQty;
    } else {
      cart.items.push({
        product: productId,
        quantity: finalQty,
        orderType: orderType || "NORMAL",
      });
    }
  }

  await cart.save();

  const populatedCart = await Cart.findOne({ user: userId })
    .populate("items.product");

  res.json(populatedCart);
};


// ================= GET CART =================
const getCart = async (req, res) => {
  
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId })
    .populate("items.product");

  res.json(cart || { items: [] });
};

// ================= UPDATE QUANTITY =================
const updateQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const item = cart.items.find(
    (i) => i.product.toString() === productId
  );

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.quantity = Math.max(1, quantity);
  await cart.save();

  const populatedCart = await Cart.findOne({ user: userId })
    .populate("items.product");

  res.json(populatedCart);
};

// ================= REMOVE ITEM =================
const removeItem = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter(
    (i) => i.product.toString() !== productId
  );

  await cart.save();

  const populatedCart = await Cart.findOne({ user: userId })
    .populate("items.product");

  res.json(populatedCart);
};

module.exports = {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
};
