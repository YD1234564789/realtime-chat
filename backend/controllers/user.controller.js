import User from "../models/user.model.js"

export const getUsersForSidebar = async (req, res) => {
  try {
    const loginUser = req.user._id
    // 除本人外的用戶
    const filteredUsers = await User.find({ _id: { $ne: loginUser}}).select("-password")

    res.status(200).json(filteredUsers)
  } catch (error) {
    console.log("Error in getUsersForSidebar controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}