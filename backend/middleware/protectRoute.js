import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
const protectRoute = async(req, res, next) => {
  try {
    // 要載入cookie-parser, 才能使用req.cookies
    const token = req.cookies.jwt
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token" })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" })
    }

    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    req.user = user

    next()
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" })
  }
}

export default protectRoute