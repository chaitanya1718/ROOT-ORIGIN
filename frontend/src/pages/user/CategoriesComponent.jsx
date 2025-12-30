import { useEffect, useState } from "react";
import api from "../../api/axios";
import { addToCart } from "../../services/cartService";
import "../../components/css/productCarousel.css";

const CategoriesComponent = ({ categoryName }) => {
  const [products, setProducts] = useState([]);
const[toast,setToast]=useState("");
 
  useEffect(() => {
    api.get("/products").then((res) => setProducts(res.data));
  }, []);

   

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
    } catch (err) {
      console.error("Add to cart error:", err.response || err);
      showToast("Failed to add!");
    }
  };
  const getDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const showToast=(message)=>{
    setToast(message);
    setTimeout(()=>{setToast("")},3000);
  }

  return (
    <section className="carousel-section">
      {
        toast &&(
          <div className="cart-toast">
            {toast}
          </div>
        )
      }
      <h2 className="carousel-title">Inventory in {categoryName}</h2>

      <div className="cat-product-container flex flex-wrap justify-start gap-2">
        {products.map((product) =>
          (product.tag == categoryName && !product.isBulkProduct )? (
            <div className="product-card category-render" key={product._id}>
              <div
                className="img-sec"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: "12px",
                }}
              >
                {/* <img  src={product.image} alt={product.name} /> */}
              </div>

              <div className="product-info px-2 py-2">
                <div>
                  <h3>{product.name}</h3>
                  <p className=" text-gray-500">
                    {product.measure.value}
                    {product.measure.unit}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p>
                      ₹{getDiscountedPrice(product.price, product.discount)}
                    </p>
                   { product.discount>0? <p className="org-price">₹{product.price}</p>:""}
                   
                  </div>

                  {product.quantity > 0 ? (
                    <button
                      className="bg-green-100 p-2 border border-green-600 rounded text-green-700 cursor-pointer"
                      disabled={product.quantity === 0}
                      onClick={() => {
                        handleAddToCart(product._id);
                        showToast(`${product.name} added to cart`);
                      }}
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
          ) :""
        )}
      </div>
    </section>
  );
};

export default CategoriesComponent;
