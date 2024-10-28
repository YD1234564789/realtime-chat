import path from "path"
import exprss from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectDB from "./config/mongoose.js"
import { app, server } from "./socket/socket.js"

dotenv.config()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve() // 取得當前路徑

app.use(cookieParser())
app.use(exprss.json())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

app.use(exprss.static(path.join(__dirname, "/frontend/dist")))
// 處理未匹配的路徑
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})


server.listen(PORT, () => {
  connectDB()
  console.log(`server running on port ${PORT}`)
})