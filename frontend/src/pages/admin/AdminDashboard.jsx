import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { BsBorderStyle } from "react-icons/bs";
import { MdAccountCircle, MdOutlineManageSearch } from "react-icons/md";
import useCountUp from "./UseCountup";

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ef4444", "#a855f7"];

const AdminDashboard = () => {
  const [pieData, setPieData] = useState([]);
  const navigate = useNavigate();
  const [todayStats, setTodayStats] = useState({
    placed: 0,
    shipped: 0,
    delivered: 0,
    revenue: 0,
  });

  async function loadData() {
    const { data: orders } = await api.get("/orders");

    const categoryCount = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const tag = item.tag || "unknown";
        categoryCount[tag] = (categoryCount[tag] || 0) + item.quantity;
      });
    });

    const chartData = Object.keys(categoryCount).map((tag) => ({
      name: tag,
      value: categoryCount[tag],
    }));

    setPieData(chartData);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    let placed = 0;
    let shipped = 0;
    let delivered = 0;
    let revenue = 0;

    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt);

      if (createdAt >= startOfToday && createdAt <= endOfToday) {
        placed += 1;
        if (order.orderStatus === "shipped") shipped += 1;
        if (order.orderStatus === "delivered") delivered += 1;
        revenue += order.totalAmount;
      }
    });

    setTodayStats({ placed, shipped, delivered, revenue });
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleSliceClick = (data) => {
    navigate(`/admin/analytics?category=${data.name}`);
  };

  const animatedPlaced = useCountUp(todayStats.placed);
  const animatedShipped = useCountUp(todayStats.shipped);
  const animatedDelivered = useCountUp(todayStats.delivered);
  const animatedRevenue = useCountUp(todayStats.revenue);

  return (
    <div
      style={{
        padding: "1.5rem",
        minHeight: "100vh",
        background: "linear-gradient(to top right, #e0e7ff, #75ffe2)",
      }}
      className="min-h-screen text-black"
    >
      <h1 className="text-3xl mb-4 bg-black w-fit p-2 rounded text-white">
        Admin Dashboard
      </h1>

      <div className="flex first-section">
        <div className="flex numerical-sight flex-col gap-4 w-[70%]">
          <h1 className="text-3xl border-b-2 border-b-cyan-800 w-fit pr-4">
            Welcome back, SrinivasaRao !
          </h1>
          <h1 className="text-2xl">Today's summary</h1>

          <div className="flex justify-around gap-2 mt-4">
            <div className="rounded-xl w-50 h-30 flex flex-col justify-center items-center bg-linear-to-br from-slate-400 via-slate-600 to-slate-900 text-white">
              <p>Orders placed</p>
              <h2 className="text-7xl font-bold">{animatedPlaced}</h2>
            </div>
            <div className="rounded-xl w-50 h-30 flex flex-col p-3 items-center bg-linear-to-br from-slate-400 via-slate-600 to-slate-900 text-white">
              Revenue generated
              <h2 className="text-4xl font-bold">Rs. {animatedRevenue}</h2>
            </div>
          </div>

          <div className="flex justify-around gap-2 mb-4 mt-4">
            <div className="rounded-xl w-50 h-30 flex flex-col justify-center items-center bg-linear-to-br from-slate-400 via-slate-600 to-slate-900 text-white">
              orders shipped
              <h2 className="text-7xl font-bold">{animatedShipped}</h2>
            </div>
            <div className="rounded-xl w-50 h-30 flex flex-col justify-center items-center bg-linear-to-br from-slate-400 via-slate-600 to-slate-900 text-white">
              orders delivered
              <h2 className="text-7xl font-bold">{animatedDelivered}</h2>
            </div>
          </div>
        </div>

        <div className="blur-overlay px-2 flex flex-col items-center justify-center text-black">
          <h2 className="text-xl -mb-20">Category-wise Orders</h2>

          <PieChart className="piechart" width={300} height={400}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
              onClick={handleSliceClick}
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <p className="text-sm text-gray-500 -mt-16">
            Click a category to view detailed analytics
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-20 py-8 justify-around">
        <Link to="/admin/orders">
          <div className="w-100 h-60 text-2xl bg-black text-white rounded flex flex-col justify-center items-center">
            <BsBorderStyle size={50} />
            <p className="border-b border-cyan-800">See orders</p>
          </div>
        </Link>
        <Link to="/admin/products">
          <div className="w-100 h-60 text-2xl bg-black text-white rounded flex flex-col justify-center items-center">
            <MdOutlineManageSearch size={50} />
            <p className="border-b border-cyan-800">Manage Products</p>
          </div>
        </Link>
        <Link to="/admin/dashboard">
          <div className="w-100 h-60 text-2xl bg-black text-white rounded flex flex-col justify-center items-center">
            <MdAccountCircle size={50} />
            <p className="border-b border-cyan-800">My account</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
