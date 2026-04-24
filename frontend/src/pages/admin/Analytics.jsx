import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#f97316", "#ef4444", "#a855f7"];

const Analytics = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [orders, setOrders] = useState([]);
  const [metric, setMetric] = useState("quantity");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  async function loadOrders() {
    const { data } = await api.get("/orders");
    setOrders(data);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const buildPie = () => {
    const map = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const tag = item.tag || "unknown";
        const value =
          metric === "revenue"
            ? item.discountedPrice * item.quantity
            : item.quantity;

        map[tag] = (map[tag] || 0) + value;
      });
    });

    setPieData(
      Object.keys(map).map((k) => ({
        name: k,
        value: Number(map[k].toFixed(2)),
      }))
    );
  };

  const buildBar = (category) => {
    const map = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.tag === category) {
          const value =
            metric === "revenue"
              ? item.discountedPrice * item.quantity
              : item.quantity;

          map[item.name] = (map[item.name] || 0) + value;
        }
      });
    });

    setBarData(
      Object.keys(map).map((name) => ({
        name,
        value: Number(map[name].toFixed(2)),
      }))
    );
  };

  useEffect(() => {
    if (orders.length === 0) return;

    buildPie();
    if (selectedCategory) {
      buildBar(selectedCategory);
    }
    // buildPie and buildBar are intentionally tied to current state in this component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, metric, selectedCategory]);

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1 className="text-3xl mb-4">Analytics</h1>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setMetric("quantity")}
          className={metric === "quantity" ? "bg-black text-white px-3" : "px-3 border"}
        >
          Quantity
        </button>
        <button
          onClick={() => setMetric("revenue")}
          className={metric === "revenue" ? "bg-black text-white px-3" : "px-3 border"}
        >
          Revenue
        </button>
      </div>
      <p>The below numbers are in rupees and quantity of stock</p>
      <div className="flex gap-8 flex-wrap">
        <PieChart width={400} height={400}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
            onClick={(d) => setSelectedCategory(d.name)}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {selectedCategory && (
          <BarChart width={500} height={350} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        )}
      </div>
    </div>
  );
};

export default Analytics;
