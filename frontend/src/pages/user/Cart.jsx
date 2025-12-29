import { useEffect, useState } from "react";
import "./Cart.css";
import { MdDelete } from "react-icons/md";
import {
  getCart,
  updateCartQty,
  removeFromCart,
} from "../../services/cartService";

import {Link, Route} from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [deliveryfee,setdeliveryfee]=useState(0);

  useEffect(() => {
    const loadCart = async () => {
      const data = await getCart();
      setCartItems(data.items || []);
    };
    loadCart();
  }, []);
  const updateQuantity = async (productId, qty) => {
    const data = await updateCartQty(productId, qty);
    setCartItems(data.items);
  };

  const removeItem = async (productId) => {
    const data = await removeFromCart(productId);
    setCartItems(data.items);
  };
  const getDiscountPrice=(price,discount)=>{
    return price-(price*discount/100);
  }

  const subtotal = cartItems.reduce((acc, item) => {
    if (!item.product || !item.product.price) return acc;
    return acc + getDiscountPrice(item.product.price,item.product.discount )* item.quantity;
  }, 0);


 

  const total = subtotal - discount +subtotal*0.1;
  const getDeliveryfee=(price)=>{
return price*0.1;
  }

  return (
    <div>
    

      <section className="cart-container">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => {
              if (!item.product) return null;
            
              return (
                <div className="cart-item" key={item.product._id}>
  <img
    src={item.product.image}
    alt={item.product.name}
    className="cart-img"
  />

  <span className="cart-name">{item.product.name} {item.product.measure.value}{item.product.measure.unit}</span>

  <span className="cart-price"> ₹{getDiscountPrice(item.product.price,item.product.discount)}</span>

  <div className="quantity-control">
    <button
      onClick={() =>
        updateQuantity(item.product._id, item.quantity - 1)
      }
    >
      -
    </button>

    <span>{item.quantity}</span>

    <button
      onClick={() =>
        updateQuantity(item.product._id, item.quantity + 1)
      }
    >
      +
    </button>
  </div>

  <button
    className="remove-btn"
    onClick={() => removeItem(item.product._id)}
  >
    <MdDelete size={22} />
  </button>
</div>

              );
            })
            
          )}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
  <div className="summary-row">
            <span>Delivery Fee</span>
           
            <span>₹{getDeliveryfee(subtotal)}</span>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <span>- ₹{discount}</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <div className="coupon-box">
            <input
              type="text"
              className="border! rounded"
              placeholder="Enter any coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button >Apply</button>
          </div>

 {cartItems.length === 0 ? (
           <button  className="checkout-btn">Add items to proceed</button>
          ) :
            <Link to="/checkout">
          <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
}
        </div>
      </section>
    </div>
  );
};

export default Cart;
