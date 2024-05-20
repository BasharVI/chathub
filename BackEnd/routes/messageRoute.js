const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const messageController = require("../controllers/messageController");

router.post("/:groupId", authMiddleware, messageController.sendMessage);

router.get("/:groupId", authMiddleware, messageController.getMessagesByGroup);

module.exports = router;
