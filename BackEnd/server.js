const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

// Routes
const authRoute = require("./routes/authRoute");
const groupRoute = require("./routes/groupRoute");
const messageRoute = require("./routes/messageRoute");

connectDB();
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/group", groupRoute);
app.use("/api/message", messageRoute);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
    console.log(`Client joined group: ${groupId}`);
  });

  socket.on("sendMessage", (message) => {
    const { groupId, content, senderId } = message;
    io.to(groupId).emit("receiveMessage", {
      groupId,
      content,
      senderId,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
