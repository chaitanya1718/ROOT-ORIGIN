import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../pages/admin/Admin.css";

const AdminProducts = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  // ================= EMPTY PRODUCT =================
  const emptyProduct = {
    name: "",
    price: "",
    discount: "",
    image: "",
    quantity: "",
    measureValue: "",
    measureUnit: "g",
    tag: "dairy",

    // 🔴 BULK FIELDS
    isBulkProduct: false,
    minBulkQty: 1,
  };

  // ================= STATE =================
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);

  // 🔍 search & filter
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // 📄 pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

    const [toast, setToast] = useState("");

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    const { data } = await api.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= CREATE / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      price: Number(formData.price),
      discount: Number(formData.discount) || 0,
      image: formData.image,
      quantity: Number(formData.quantity),
      tag: formData.tag,
      measure: {
        value: Number(formData.measureValue),
        unit: formData.measureUnit,
      },

      // 🔴 BULK DATA
      isBulkProduct: formData.isBulkProduct,
      minBulkQty: formData.isBulkProduct
        ? Number(formData.minBulkQty)
        : 1,
    };

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${admin.token}` },
        });
      } else {
        await api.post("/products", payload, {
          headers: { Authorization: `Bearer ${admin.token}` },
        });
      }

      setFormData(emptyProduct);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err.response?.data || err.message);
      showToast("Error saving product")
      // alert("Error saving product");
    }
  };

  // ================= EDIT =================
  const editProduct = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      discount: product.discount,
      image: product.image,
      quantity: product.quantity,
      measureValue: product.measure?.value || "",
      measureUnit: product.measure?.unit || "g",
      tag: product.tag || "dairy",

      // 🔴 BULK
      isBulkProduct: product.isBulkProduct || false,
      minBulkQty: product.minBulkQty || 1,
    });
  };

  // ================= DELETE =================
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await api.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${admin.token}` },
    });

    fetchProducts();
  };

  // ================= FILTERING =================
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    const matchName =
      searchText === "" ||
      product.name.toLowerCase().includes(searchText);

    const matchId =
      searchText === "" ||
      product._id.toLowerCase().includes(searchText);

    const matchCategory =
      categoryFilter === "" || product.tag === categoryFilter;

    return (matchName || matchId) && matchCategory;
  });

  // ================= PAGINATION =================
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const paginatedProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter]);

    const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast("");
    }, 5000);
  };


  return (
    <div style={{ padding: "1.5rem" }} className="bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-[#1d4ed8] via-[#1e40af] to-[#111827]">
      {toast && <div className="cart-toast ">{toast}</div>}
      {/* ============ PRODUCT FORM ============ */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
        style={{ marginBottom: "2rem" }}
      >
        <h2 className="text-2xl">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>

        <input
          className="border-2! border-cyan-600 rounded"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          className="border-2! border-cyan-600 rounded"
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <div className="flex gap-2 bg-transparent">
          <input
            className="border-2! border-cyan-600 rounded"
            name="measureValue"
            type="number"
            placeholder="Measure value"
            value={formData.measureValue}
            onChange={handleChange}
            required
          />

          <select
            className="border-2! border-cyan-600 rounded w-50"
            name="measureUnit"
            value={formData.measureUnit}
            onChange={handleChange}
          >
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
            <option value="pcs">pcs</option>
          </select>
        </div>

        <select
          className="border-2! p-1 border-cyan-600 rounded"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
        >
          <option value="dairy">Dairy</option>
          <option value="refreshments">Refreshments</option>
          <option value="sweets">Sweets</option>
          <option value="dry-fruits">Dry-Fruits</option>
          <option value="snacks">Snacks</option>
            <option value="frozen">Frozen</option>
              <option value="ice-creams">Ice-creams</option>
                <option value="Namkeen">Namkeen</option>
        </select>

        <input
          className="border-2! border-cyan-600 rounded"
          name="discount"
          type="number"
          placeholder="Discount %"
          value={formData.discount}
          onChange={handleChange}
        />

        <input
          className="border-2! border-cyan-600 rounded"
          name="quantity"
          type="number"
          placeholder="Stock Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <input
          className="border-2! border-cyan-600 rounded"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />

        {/* 🔴 BULK PRODUCT SECTION */}
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isBulkProduct}
            onChange={(e) =>
              setFormData({
                ...formData,
                isBulkProduct: e.target.checked,
              })
            }
            />
            Bulk Product (Marriage / Event)
        </label>

        {formData.isBulkProduct && (
          <label>
            No of pieces/Quantity
          <input
            className="border-2! border-cyan-600 rounded"
            type="number"
            placeholder="Minimum Bulk Quantity"
            value={formData.minBulkQty}
            onChange={(e) =>
              setFormData({
                ...formData,
                minBulkQty: Number(e.target.value),
              })
            }
            />
            </label>
        )}

        <button
          type="submit"
          className="bg-green-500 hover:rounded-3xl transition-all duration-200 text-white w-50 p-2 rounded"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>

        {editingId && (
          <button
            type="button"
            className="bg-cyan-500 w-50 p-2 rounded"
            onClick={() => {
              setEditingId(null);
              setFormData(emptyProduct);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* ============ SEARCH & FILTER ============ */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by product name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border! p-2 rounded"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="dairy">Dairy</option>
          <option value="grocery">Grocery</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="snacks">Snacks</option>
        </select>
      </div>

      {/* ============ PRODUCT LIST ============ */}
      <h3 className="text-2xl">Products</h3>
      <hr />

      {paginatedProducts.map((product) => (
        <div key={product._id}>
          <p>PID: {product._id}</p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              padding: "0.5rem 0",
            }}
          >
            <div className="flex items-center">
              <div className="w-20 h-20">
                <img src={product.image} alt="" />
              </div>

              <div>
                <strong>{product.name}</strong> | {product.tag}
                <br />
                ₹{product.price} | {product.measure.value}
                {product.measure.unit}
                <br />
                Stock: {product.quantity}
                {product.isBulkProduct && (
                  <span className="ml-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">
                    BULK
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editProduct(product)}
                className="bg-yellow-300 p-2 rounded w-20"
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-600 w-20 p-2 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* ============ PAGINATION ============ */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-6 justify-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`border px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
