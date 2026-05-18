const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const employeeRoutes =
  require("./routes/employeeRoutes");

const aiRoutes =
  require("./routes/aiRoutes");

const authRoutes =
  require("./routes/authRoutes");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/employees", employeeRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});