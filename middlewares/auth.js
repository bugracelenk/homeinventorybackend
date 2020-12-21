const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "HH5ZfXCgpkzruvrKUoww");
      req.user = decoded;
      next();
    } else {
      throw new Error("Auth failed: no token");
    }
  } catch (err) {
    return res.json({
      status: false,
      message: err.message,
    });
  }
};
