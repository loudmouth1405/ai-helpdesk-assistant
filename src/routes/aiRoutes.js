const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  troubleshoot,
  resolveIssue,
} = require("../controllers/aiController");

router.post("/troubleshoot", authMiddleware, troubleshoot);
router.post("/resolve", authMiddleware, resolveIssue);

module.exports = router;