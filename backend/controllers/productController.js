const Product = require("../models/Product");

// GET
const getProducts = async (req, res) => {
  try {
    const filter = {};

    // ✅ BULK FILTER (from query, not body)
    if (req.query.bulk === "true") {
      filter.isBulkProduct = true;
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE
const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

// UPDATE
// UPDATE
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ BASIC FIELDS
    product.name = req.body.name;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.image = req.body.image;
    product.quantity = req.body.quantity;
    product.tag = req.body.tag;

    // ✅ MEASURE
    if (req.body.measure) {
      product.measure = {
        value: req.body.measure.value,
        unit: req.body.measure.unit,
      };
    }

    // ✅ BULK FIELDS
    product.isBulkProduct = req.body.isBulkProduct;
    product.minBulkQty = req.body.isBulkProduct
      ? req.body.minBulkQty
      : 1;

    await product.save();
    res.json(product);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// DELETE
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
