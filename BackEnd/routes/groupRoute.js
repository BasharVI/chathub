const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, groupController.createGroup); //Create a new group

router.get("/", authMiddleware, groupController.getAllGroups); // Get all group details
router.get("/ownGroup", authMiddleware, groupController.getCreatedGroup); // Get details of created group
router.get("/joinedGroup", authMiddleware, groupController.getJoinedGroup); // Get all joined group
router.get("/:groupId", authMiddleware, groupController.getGroupDetails); // Get group details
router.post("/:groupId/join", authMiddleware, groupController.joinGroup); // Join a group
router.post("/:groupId/leave", authMiddleware, groupController.leaveGroup); //leave a group

router.put("/:groupId", authMiddleware, groupController.updateGroup); //Update a group
router.delete("/:groupId", authMiddleware, groupController.deleteGroup); //delete a group

module.exports = router;
