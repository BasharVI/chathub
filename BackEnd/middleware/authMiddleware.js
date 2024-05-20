const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "Access denied. Invalid token." });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Access denied. Invalid token." });
  }
};

module.exports = authMiddleware;
