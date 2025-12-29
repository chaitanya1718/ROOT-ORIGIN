import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import AddressForm from "./AddressForm";
import PaymentSection from "./PaymentSection";

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState({ items: [] });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
const [toast, setToast] = useState("");
const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  


  // 🔹 Load profile + cart
  const loadData = async () => {
    const profileRes = await api.get("/users/profile");
    const cartRes = await api.get("/cart");

    setAddresses(profileRes.data.addresses || []);
    setCart({
      items: cartRes.data?.items || [],
    });

    const defaultAddr = profileRes.data.addresses?.find(
      (a) => a.isDefault
    );
    if (defaultAddr) {
      setSelectedAddress(defaultAddr);
    }
  };

  useEffect(() => {
    loadData();
  }, []);


const payWithRazorpay = (methodType) => {
  if (!window.Razorpay) {
    showToast("Payment system not loaded");
    return;
  }

  const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY,
  amount: total * 100,
  currency: "INR",
  name: "Demo Store",
  description: "Order Payment",

  method: {
    upi: true,
    card: true,          // REQUIRED in test mode
    netbanking: false,
    wallet: false,
    emi: false,
    paylater: false,
  },

  handler: function (response) {
    placeOrder(methodType);
  },

  prefill: {
    email: user?.email || "",
    contact: user?.mobile || "",
  },

  theme: {
    color: "#6366f1",
  },
};

  const rzp = new window.Razorpay(options);
  rzp.open();
};






  const getDiscountPrice=(price,discount)=>{
return price-(price*discount/100);
  }


  // 🔹 Calculate total
  const subtotal = cart.items.reduce(
  (sum, i) =>
    sum + getDiscountPrice(i.product.price, i.product.discount) * i.quantity,
  0
);

const delFee = subtotal * 0.1;
const total = subtotal + delFee;

  // 🔹 Place Order
 const placeOrder = async (methodOverride) => {
  const finalMethod = methodOverride || paymentMethod;

  if (!selectedAddress) {
    showToast("Please select an address to proceed");
    return;
  }

  if (cart.items.length === 0) {
    showToast("Cart is empty");
    return;
  }

  try {
    await api.post("/orders", {
      address: selectedAddress,
      paymentMethod: finalMethod,
    });

    showToast("Order placed successfully");
    navigate("/orders");
  } catch (err) {
    showToast("Failed to order !");
    console.log(err);
  }
};


   const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast("");
    }, 5000);
  };



  return (
    <div style={{ padding: "1rem" }}>

     {toast && <div className="cart-toast">{toast}</div>}

      <h2 className="text-3xl">Checkout</h2>

      {/* ===== CART SUMMARY ===== */}
      <h3 className="text-xl mt-4">Order Summary</h3>

      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.items.map((item) => (
          <div key={item.product._id}>
            {item.product.name} × {item.quantity} = ₹
            {getDiscountPrice(item.product.price,item.product.discount) * item.quantity}
          </div>
        ))
      )}
        <p>Delivery fee: ₹{delFee} </p>
      <strong>Total: ₹{total}</strong>

      <hr className="my-4" />

      {/* ===== ADDRESS SELECTION ===== */}
      <h3 className="text-xl">Select Address</h3>

      {addresses.length === 0 ? (
        <p>No address found. Please add one.</p>
      ) : (
        addresses.map((addr) => (
          <div key={addr._id}>
            <input
              type="radio"
              checked={selectedAddress?._id === addr._id}
              onChange={() => setSelectedAddress(addr)}
            />

            <span>
            {addr.name}, {addr.hno}, {addr.street}, {addr.city} - {addr.pincode}

            </span>

            <button
              onClick={() => {
                setEditingAddress(addr);
                setShowForm(true);
              }}
            >
              Edit
            </button>

            <button
              onClick={async () => {
                await api.delete(`/users/address/${addr._id}`);
                loadData();
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}

      {/* ===== ADD / EDIT ADDRESS ===== */}
      <button
        className="bg-amber-200 p-2 rounded border border-amber-400 w-50"
        onClick={() => {
          setEditingAddress(null);
          setShowForm(!showForm);
        }}
      >
        {showForm ? "Cancel" : "Add New Address"}
      </button>

      {showForm && (
        <AddressForm
          onSuccess={loadData}
          editingAddress={editingAddress}
          cancelEdit={() => {
            setEditingAddress(null);
            setShowForm(false);
          }}
        />
      )}

      <hr className="my-4" />

      {/* ===== PAYMENT METHOD ===== */}
      <h3 className="text-xl">Payment Method</h3>




      <div>
        <input
          type="radio"
          checked={paymentMethod === "COD"}
          onChange={() => setPaymentMethod("COD")}
        />{" "}
        Cash on Delivery
      </div>
    <div  >
        <input
          type="radio"
          checked={paymentMethod === "CARD"}
          onChange={() => setPaymentMethod("CARD")}
        />{" "}
        
        Card
      </div>
      <div>
        <input
          type="radio"
          checked={paymentMethod === "UPI"}
          onChange={() => setPaymentMethod("UPI")}
        />{" "}
        UPI
      </div>

  
 {paymentMethod === "UPI" && (
  <button
    className="bg-linear-to-tr from-teal-300 to-cyan-300 text-white p-2 rounded"
    onClick={() => payWithRazorpay("UPI")}
  >
    Pay ₹{total} via UPI
  </button>
)}

{paymentMethod === "CARD" && (
  <button
    className="bg-linear-to-tr from-teal-300 to-cyan-300 text-white p-2 rounded"
    onClick={() => payWithRazorpay("CARD")}
  >
    Pay ₹{total} via Card
  </button>
)}


      {/* ===== PLACE ORDER ===== */}
   {paymentMethod === "COD" && (
  <button
    className="bg-green-300 border-green-500 border mt-4 p-2 rounded"
    onClick={() => placeOrder()}
  >
    Place Order
  </button>
)}
    </div>
  );
};

export default Checkout;
