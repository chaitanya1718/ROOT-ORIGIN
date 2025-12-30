import { useEffect, useState } from "react";
import api from "../api/axios";
import { addToCart } from "../services/cartService";
import "./css/productCarousel.css";

const CurrentDeals = () => {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  const getDiscountedPrice = (price, discount) =>
    price - (price * discount) / 100;

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 5000);
  };

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id);
      showToast(`${product.name} added to cart`);
    } catch (err) {
      console.error("Add to cart error:", err.response || err);
      showToast("Failed to add to cart");
    }
  };

  const dealProducts = products.filter(
    (p) => p.discount > 0 && !p.isBulkProduct
  );

  return (
    <section style={{ padding: "1rem" }}>
      {/* 🔔 Toast */}
      {toast && <div className="cart-toast">{toast}</div>}

      <h2 className="text-3xl mb-4 border-b-cyan-500 border-b w-fit px-2 text-cyan-800 font-semibold">
     Current Deals
      </h2>

      {dealProducts.length === 0 ? (
        <p>No deals available right now</p>
      ) : (
        <div className="flex flex-wrap gap-3 justify-start">
          {dealProducts.map((product) => (
            <div
              key={product._id}
              className="product-card category-render relative"
            >
              {/* 🔴 Discount Badge */}
              <span
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "8px",
                  background: "#ef4444",
                  color: "#fff",
                  padding: "4px 8px",
                  fontSize: "12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  zIndex: 10,
                }}
              >
                {product.discount}% OFF
              </span>

              {/* Image */}
              <div
                className="img-sec"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: "12px",
                }}
              />

              {/* Info */}
              <div className="product-info px-2 py-2">
                <div>
                  <h3>{product.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {product.measure.value}
                    {product.measure.unit}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex flex-col">
                    <p className="font-semibold">
                      ₹{getDiscountedPrice(product.price, product.discount)}
                    </p>
                    <p className="org-price">₹{product.price}</p>
                  </div>

                  {product.quantity > 0 ? (
                    <button
                      className="bg-green-100 p-2 border border-green-600 rounded text-green-700 cursor-pointer"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <span className="bg-gray-200 p-2 border border-gray-600 rounded opacity-50">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CurrentDeals;
