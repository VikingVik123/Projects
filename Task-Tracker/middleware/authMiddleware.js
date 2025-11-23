const jwt = require("jsonwebtoken");
const { tokenBlacklist } = require("../routes/authroute");

module.exports = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header("Authorization");

  // If no token is provided, return a 401 error (Unauthorized)
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    // Remove "Bearer " prefix from token if it exists
    const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;

    // Check if token is blacklisted
    if (tokenBlacklist.has(actualToken)) {
      return res.status(401).json({ message: "Token has been revoked" });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(actualToken, process.env.JWT_TOKEN);

    // Assign decoded user data (user _id) to req.userId
    req.userId = decoded._id;

    // Log the decoded token for debugging purposes
    console.log("Decoded Token:", decoded);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If there is an error in verifying the token, send a 400 response
    res.status(400).json({ message: "Invalid token" });
  }
};
