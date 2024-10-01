import exprss from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js"
import connectDB from "./config/mongoose.js"

dotenv.config()
const app = exprss()
const PORT = process.env.PORT || 5000


app.use(exprss.json())
app.use("/api/auth", authRoutes)




app.listen(PORT, () => {
  connectDB()
  console.log(`server running on port ${PORT}`)
})