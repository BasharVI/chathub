const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true, unique: true },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
