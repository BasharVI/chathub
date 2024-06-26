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

// Leave a group
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

//To get the group created by a particular user

const getCreatedGroup = async (req, res) => {
  try {
    const userId = req.user._id;
    const ownGroup = await Group.find({ creatorId: userId });
    res.status(200).json(ownGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
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

// To get all joined group
const getJoinedGroup = async (req, res) => {
  try {
    const userId = req.user._id;
    const groups = await Group.find({ members: userId });
    res.status(200).json({ groups });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
// To get the group details by id

const getGroupDetails = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.user._id;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    const memberCount = group.members.length;
    const isMember = group.members.includes(userId);

    res.status(200).json({
      groupName: group.groupName,
      description: group.description,
      creatorId: group.creatorId,
      members: group.members,
      isMember: isMember,
      memberCount: memberCount,
    });
  } catch (error) {
    console.error("Error fetching group details:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// To update the group details
const updateGroup = async (req, res) => {
  const { groupId } = req.params;
  const { groupName, description } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    group.groupName = groupName;
    group.description = description;
    await group.save();

    res.status(200).json({ message: "Group updated successfully", group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// To delete a group
const deleteGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    if (group.creatorId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this group" });
    }

    await group.remove();

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createGroup,
  joinGroup,
  leaveGroup,
  getAllGroups,
  updateGroup,
  deleteGroup,
  getCreatedGroup,
  getJoinedGroup,
  getGroupDetails,
};
