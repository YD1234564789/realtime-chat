import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js"



export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id
    // 用findOne去找對話 $all 表示一定要有這兩個
    let conversation =  await Conversation.findOne({
      participants: { $all: [senderId, receiverId]}
    })
    // 對話創建後預設有message:[]
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    await Promise.all([conversation.save(), newMessage.save()])

    // 發消息給指定用戶
    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }


    res.status(201).json({newMessage})

  } catch (error) {
    console.log("Error in sendMessage controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const senderId = req.user._id
    // 使用populate把message填充進來 否則只有id會出現
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate("messages")

    if (!conversation) return res.status(200).json([])
    
    const messages = conversation.messages

    res.status(200).json(messages)
  } catch (error) {
    console.log("Error in getMessage controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}