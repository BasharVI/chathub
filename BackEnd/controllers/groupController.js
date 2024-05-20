const Group = require("../models/group");

// To Create a new Group
const createGroup = async (req, res) => {
  const { groupName, description } = req.body;
  const creatorId = req.user._id;
  try {
    const groupExists = await Group.findOne({ groupName });
    if (groupExists) {
      return res
        .status(400)
        .json({ error: "A group with this name already exists" });
    }
    const newGroup = new Group({
      groupName,
      description,
      creatorId,
      members: [creatorId],
    });

    await newGroup.save();
    res
      .status(201)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// To join a existing group
const joinGroup = async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user._id;
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    if (group.members.includes(userId)) {
      return res
        .status(400)
        .json({ error: "User is already a member of this group" });
    }

    group.members.push(userId);
    await group.save();

    res
      .status(200)
      .json({ message: "User joined the group successfully", group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const leaveGroup = async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user._id;
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    if (!group.members.includes(userId)) {
      return res
        .status(400)
        .json({ error: "User is not a member of this group" });
    }

    group.members.pull(userId);
    await group.save();

    res
      .status(200)
      .json({ message: "User left the group successfully", group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// To get all the groups.
const getAllGroups = async (req, res) => {
  try {
    const allGroups = await Group.find();
    res.status(200).json({ allGroups });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { createGroup, joinGroup, leaveGroup, getAllGroups };
