const ticketRoutes = require("./routes/ticketRoutes");
const aiRoutes = require("./routes/aiRoutes");

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "AI Helpdesk Backend is Running!"
  });
});

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Welcome!",
    user: req.user,
  });
});

module.exports = app;