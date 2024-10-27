import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
})

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

// {userId: socketId} 多設備可使用 userId :[socketId1, socketId2...] 方式
const userSocketMap = {}

io.on("connection", (socket) => {

  console.log("A uer connected", socket.id)
  // 從 query 取得 userId
  const userId = socket.handshake.query.userId
  if(userId != "undefined") userSocketMap[userId] = socket.id

  io.emit("getOnlineUsers", Object.keys(userSocketMap)) 

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id)
    delete userSocketMap[userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap)) 
  })
})


export { app , io, server }