const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTicket,
  getTickets,
  getTicketById
} = require("../controllers/ticketController");

router.post("/", authMiddleware, createTicket);
router.get("/", authMiddleware, getTickets);
router.get("/:id", authMiddleware, getTicketById);

module.exports = router;