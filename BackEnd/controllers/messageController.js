const Message = require("../models/message");
const Group = require("../models/group");

const sendMessage = async (req, res) => {
  const { groupId } = req.params;
  const { content } = req.body;
  const senderId = req.user._id;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Group not found" });
    }

    const message = new Message({
      groupId,
      senderId,
      content,
    });

    await message.save();

    res.status(201).json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getMessagesByGroup = async (req, res) => {
  const { groupId } = req.params;

  try {
    const messages = await Message.find({ groupId });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { sendMessage, getMessagesByGroup };
