// middleware/authenticate.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = {
  verifyToken(req, res, next) {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Unauthorized" });
    }
  },
};
module.exports = authMiddleware;
