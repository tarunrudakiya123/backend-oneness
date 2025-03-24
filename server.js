const express = require("express");
const cors = require("cors");
const env = require("dotenv");
const connectDb = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

env.config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

connectDb();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to My Express App!");
});




app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);







// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
