import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import { addToCart } from "../../services/cartService";
import "../../components/css/productCarousel.css";


const normalize = (str = "") => str.toLowerCase().replace(/[\s-]/g, "");

const eventKeywords = ["event", "events", "birthday", "marriage", "wedding"];

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const [showBulk, setShowBulk] = useState(false);
  const [toast, setToast] = useState("");

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const normalizedQuery = normalize(query);

  // 🔹 Fetch products once
  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

  // 🔹 Auto-enable bulk when event keywords found
  useEffect(() => {
    const isEventSearch = eventKeywords.some((k) =>
      normalizedQuery.includes(k)
    );
    setShowBulk(isEventSearch);
  }, [normalizedQuery]);

  const filteredProducts = products.filter((product) => {
    const name = normalize(product.name);
    const tag = normalize(product.tag);
    const id = product._id.toLowerCase();

    const matchesText =
      name.includes(normalizedQuery) ||
      tag.includes(normalizedQuery) ||
      id.includes(normalizedQuery);

    if (showBulk) return matchesText && product.isBulkProduct;
    return matchesText && !product.isBulkProduct;
  });

  const getDiscountedPrice = (price, discount) =>
    price - (price * discount) / 100;

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000); // 3 seconds
  };

  return (

    

    <section className="carousel-section">

{toast && (
  <div className="cart-toast">
    {toast}
  </div>
)}

      <div className="flex justify-between items-center">
        <h4 className="carousel-title">
          Results for: <b>{query}</b>
        </h4>

        {/* 🔴 BULK TOGGLE */}
        <button
          onClick={() => setShowBulk(!showBulk)}
          className={`px-3 py-1 rounded border ${
            showBulk ? "bg-yellow-200 border-2! border-yellow-400 " : ""
          }`}
        >
          {showBulk ? "Show normal Products" : "Show Bulk Products"}
        </button>
      </div>

      <div className="cat-product-container flex flex-wrap gap-2">
        {filteredProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card category-render" key={product._id}>
              <div
                className="img-sec"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: "cover",
                  borderRadius: "12px",
                }}
              />

              <div className="product-info px-2 py-2">
                <h3>{product.name}</h3>
                <p className="text-gray-500">
                  {product.measure.value}
                  {product.measure.unit}
                </p>

                <div className="flex justify-between">
                  <div>
                    ₹{getDiscountedPrice(product.price, product.discount)}
                    {product.discount > 0 && (
                      <p className="org-price">₹{product.price}</p>
                    )}
                  </div>

                  {product.quantity > 0 ? (
                    <button
                      className="bg-green-100 p-2 border border-green-600 rounded"
                      onClick={() => {
                        addToCart(product._id);
                        showToast(`${product.name} added to cart`);
                      }}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <span className="opacity-50">Out of Stock</span>
                  )}
                </div>

                {product.isBulkProduct && (
                  <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded">
                    BULK
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default SearchResults;
