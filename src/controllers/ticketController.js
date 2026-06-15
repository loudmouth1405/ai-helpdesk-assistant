const prisma = require("../config/prisma");

// Create a ticket
const createTicket = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      priority
    } = req.body;

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        category,
        priority,
        status: "Open",
        userId: req.user.id
      }
    });

    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create ticket"
    });
  }
};

// Get all tickets for the logged-in user
const getTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        userId: req.user.id
      },
      orderBy: {
        createdDate: "desc"
      }
    });

    res.json(tickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch tickets"
    });
  }
};

// Get one ticket by ID
const getTicketById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const ticket = await prisma.ticket.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    res.json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch ticket"
    });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById
};