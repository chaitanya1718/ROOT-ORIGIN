import { useEffect, useState } from "react";
import api from "../../api/axios";
import { downloadInvoice } from "../../services/invoiceService";
import catEmpty from "../../assets/cat_empty.png";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getDiscountPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  const loadOrders = async () => {
    const { data } = await api.get("/orders/my");
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <div>
        <img src={catEmpty} className="h-30 w-40" alt="no orders found." />
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2 className="text-2xl border-b border-b-balck w-fit pr-4">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid black",
            padding: "1rem",
            marginTop: "1rem",
            background: "linear-gradient(to bottom left, #ffe4e6, #ccfbf1)",
          }}
        >
          <div className="flex justify-between">
            <p>
              <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}
            </p>

            {order.orderStatus === "delivered" ? (
              <span className="px-2 bg-green-300 rounded">{order.orderStatus}</span>
            ) : (
              <span className="px-2 bg-amber-200 rounded">{order.orderStatus}</span>
            )}
          </div>

          <p>
            <strong>Status:</strong> {order.orderStatus}
          </p>

          <p>
            <strong>Payment:</strong> {order.paymentMethod}
          </p>
          <p>
            <strong>Address: </strong>
            {order.address.name},{order.address.mobile},{order.address.city}-{order.address.pincode}
          </p>

          <hr />

          {order.items.map((item, i) => (
            <div key={i}>
              {item.name} x {item.quantity} = Rs.
              {getDiscountPrice(item.price, item.discount) * item.quantity}
            </div>
          ))}

          <hr />
          <p>Delivery fee: Rs.{order.deliveryFee}</p>
          <strong>Total: Rs.{order.totalAmount}</strong>

          <button className="bg-blue-300 p-2 mt-2 rounded" onClick={() => downloadInvoice(order._id)}>
            Download Invoice
          </button>
        </div>
      ))}
    </div>
  );
};

export default Orders;
