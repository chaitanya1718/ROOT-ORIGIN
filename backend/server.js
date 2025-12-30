const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const mongoose=require("mongoose");

dotenv.config();
connectDB();




const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");



app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/payments", require("./routes/paymentRoutes"));



app.use("/api/products", require("./routes/productRoutes"));

app.use("/api/cart", require("./routes/cartRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

app.use(cors({
  origin: ["http://localhost:5173", "https://your-vercel-app.vercel.app"],
  credentials: true,
}));