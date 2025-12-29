import { useEffect, useState } from "react";
import api from "../../api/axios";
import { downloadInvoice } from "../../services/invoiceService";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const getStatusStyle = (status) => {
    switch (status) {
      case "placed":
        return { backgroundColor: "#eff213" }; // yellow
      case "delivered":
        return { backgroundColor: "#13f230" }; // green
      case "shipped":
        return { backgroundColor: "#13f2e7" }; // blue
      case "cancelled":
        return { backgroundColor: "#f23913" }; // red
      default:
        return {};
    }
  };

  const loadOrders = async () => {
    const { data } = await api.get("/orders");
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchEmail, searchProduct, statusFilter, fromDate, toDate]);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    loadOrders();
  };
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);

    const matchStatus =
      statusFilter === "" || order.orderStatus === statusFilter;

    const matchEmail =
      searchEmail === "" ||
      order.user?.email?.toLowerCase().includes(searchEmail.toLowerCase());

    const matchProduct =
      searchProduct === "" ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchProduct.toLowerCase())
      );

    const matchFromDate = !fromDate || orderDate >= new Date(fromDate);

    const matchToDate = !toDate || orderDate <= new Date(toDate);

    return (
      matchStatus && matchEmail && matchProduct && matchFromDate && matchToDate
    );
  });
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const paginatedOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div style={{ padding: "1rem" }} className="">
      <h2 className="text-2xl">Admin Orders</h2>

      {/* <div className="flex gap-2 mb-4">
  <input
    type="text"

    placeholder="Search product name"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border! p-2 rounded"
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border p-2 rounded"
  >
    <option value="">All Status</option>
    <option value="placed">Placed</option>
    <option value="shipped">Shipped</option>
    <option value="delivered">Delivered</option>
    <option value="cancelled">Cancelled</option>
  </select>
</div> */}
      <div className="flex flex-wrap gap-3 mb-4 ">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
          className="border! p-2 rounded"
        />

        {/* Search by user email */}
        <input
          type="text"
          placeholder="Search by user email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border! p-2 rounded"
        />

        {/* Filter by status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="placed">Placed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* From date */}
        <label htmlFor="">
          From date:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border! p-2 rounded"
          />
        </label>

        {/* To date */}
        <label htmlFor="">
          To date:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border! p-2 rounded"
          />
        </label>
      </div>

      {paginatedOrders.map((order) => (
        <div
          key={order._id}
          className="border p-4 mt-4 rounded 
          bg-gradient-to-bl from-[#ffe4e6]  to-[#ccfbf1]"
        
        >
          {/* ===== ORDER HEADER ===== */}
          <div className="flex justify-between">

          <p className="flex items-center gap-2">
            <strong>User:</strong> {order.user.email}
            {order.orderType === "BULK" && (
              <span className="bg-yellow-400  px-2 py-1 text-xs rounded">
                BULK
              </span>
            )}
          </p>
            
         <span style={{background:"#fafafa",...getStatusStyle(order.orderStatus)}} className="px-2 rounded">
            {order.orderStatus}
        </span>
            </div>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <p>
            <strong>Total:</strong> ₹{order.totalAmount}
          </p>


          <p className="">
            <strong>Address:</strong> 
             </p>
         <ul>
          <li>{order.address.name}, mobile: {order.address.mobile}</li>
          <li>street: {order.address.street}</li>
       
          <li>city: {order.address.city},{order.address.pincode}</li>
          <li></li>
         </ul>
         
          <p>
            <strong>Status:</strong> {order.orderStatus}
          </p>
          <p>

            <strong>Payment:</strong> {order.paymentMethod} 
          </p>
<hr />
          {/* ===== ORDER ITEMS ===== */}
          <div style={{ marginTop: "1rem" }}>
            <strong>Items:</strong>

            {order.items.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "0.5rem",
                  paddingLeft: "1rem",
                }}
              >
                <span className="font-bold">
                  {index + 1}. {item.name}
                  <span style={{ fontWeight: "bold", marginLeft: "10rem" }}>
                    Qty: {item.quantity}
                  </span>
                </span>

                <span>
                  ₹
                  {item.discountedPrice
                    ? item.discountedPrice * item.quantity
                    : item.price * item.quantity}
                </span>
                <span style={{ color: "gray" }}>
                  Product ID: {item.product}
                </span>
                {item.isBulkProduct==="True" && (
                  <span className="bg-yellow-300  px-2 py-1 text-xs rounded">
                    BULK
                  </span>
                )}
              <p>
  <strong>Delivery Fee:</strong> ₹{order.deliveryFee}
</p>
              </div>
            ))}
          </div>

          {/* ===== STATUS UPDATE ===== */}
          <div style={{ marginTop: "1rem" }} className="flex">
            <p>
              
              update status: 
              </p>
            <select
              value={order.orderStatus}
              className="border border-gray-800"
              onChange={(e) => updateStatus(order._id, e.target.value)}
            >
              <option value="placed">Placed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button
            className="bg-blue-900 p-2 mt-2 rounded text-white"
            onClick={() => downloadInvoice(order._id)}
          >
            Invoice
          </button>
        </div>
      ))}

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
                currentPage === i + 1 ? "bg-black text-white" : ""
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

export default AdminOrders;
