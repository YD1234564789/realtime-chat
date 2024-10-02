import Message from "../models/message.model.js"
import Conversation from "../models/conversation.model.js"



export const sendMessage = async(req, res) => {
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

    res.status(201).json({newMessage})

  } catch (error) {
    console.log("Error in sendMessage controller", error.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
}