const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get header
  const authHeader = req.header("Authorization");

  // Check if header exists
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Remove "Bearer " if present
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;   // contains { id, role }
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
