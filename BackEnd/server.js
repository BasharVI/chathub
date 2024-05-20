const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
