const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, groupController.createGroup);

router.get("/", authMiddleware, groupController.getAllGroups);
router.post("/:groupId/join", authMiddleware, groupController.joinGroup);
router.post("/:groupId/leave", authMiddleware, groupController.leaveGroup);

router.put("/:groupId", authMiddleware, groupController.updateGroup);

router.delete("/:groupId", authMiddleware, groupController.deleteGroup);

module.exports = router;
