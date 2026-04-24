import { useEffect, useState } from "react";
import api from "../api/axios";

const BulkProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const fetchBulkProducts = async () => {
      try {
        const res = await api.get("/products?bulk=true");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        showToast("Failed to load bulk products");
      } finally {
        setLoading(false);
      }
    };

    fetchBulkProducts();
  }, []);

  const getDiscount = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const addBulkToCart = async (product) => {
    try {
      await api.post("/cart", {
        productId: product._id,
        quantity: product.minBulkQty,
        orderType: "BULK",
      });

      showToast("Product added to cart");
    } catch (err) {
      console.error(err.response?.data || err.message);
      showToast("Failed to add !");
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast("");
    }, 5000);
  };

  if (loading) return <p style={{ padding: "1rem" }}>Loading...</p>;

  return (
    <div
      style={{ padding: "1.5rem" }}
      className="min-h-screen bg-linear-to-bl from-cyan-100 to-teal-400"
    >
      {toast && <div className="cart-toast">{toast}</div>}

      <h2 className="text-2xl mb-4 w-fit border-b border-cyan-800 pr-8">
        Order for your Birthday, Wedding and other events
      </h2>

      {products.length === 0 ? (
        <p>No bulk products available</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="border order-card border-gray-400 p-4 mb-3 rounded flex justify-between items-center"
          >
            <div className="flex gap-3 items-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover"
              />

              <div>
                <h4 className="font-semibold">{product.name}</h4>
                <p>Rs.{getDiscount(product.price, product.discount)}</p>
                <p style={{ textDecoration: "line-through" }} className="text-sm text-gray-500">
                  Rs.{product.price}
                </p>
                <p className="text-sm text-gray-600">
                  Min purchase: {product.minBulkQty}X
                </p>
                <p className="text-sm text-gray-600">
                  Qty: {product.measure.value}
                  {product.measure.unit}
                </p>
              </div>
            </div>

            <button
              onClick={() => addBulkToCart(product)}
              className="bg-green-300 border-green-500 border text-green-700 px-4 py-2 rounded"
            >
              Add in Bulk
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default BulkProducts;
