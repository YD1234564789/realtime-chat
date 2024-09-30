import exprss from "express"
import dotenv from "dotenv"

import connectDB from "./config/mongoose.js"
import authRoutes from "./routes/auth.routes.js"
const app = exprss()

dotenv.config()
const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
  res.send("homeroute")
})

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
  connectDB()
  console.log(`server running on port ${PORT}`)
})