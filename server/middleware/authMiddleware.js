import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // ❌ No header
    if (!authHeader) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // ❌ Invalid format (must be: Bearer token)
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // ✅ Extract token
    const token = authHeader.split(" ")[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach clean user data
    req.user = {
      id: decoded.id,
      role: decoded.role, // 🔥 VERY IMPORTANT for admin routes
    };

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token ❌" });
  }
};

export default authMiddleware;