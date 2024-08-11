const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = async (req, res, next) => {
  try {
    // get token from headers
    const authHeader = req.headers.authorization || "";
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({});
    }

    const authToken = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(authToken, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({});
  }
};

module.exports = {
  authMiddleware,
};
