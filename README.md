# Realtime-chat

![login](https://github.com/user-attachments/assets/883913eb-e091-4522-9313-541733eb1460)
![texting](https://github.com/user-attachments/assets/5ebff9e0-0c45-4fe5-b6c9-42431398f121)



# 介紹
[練習影片](https://www.youtube.com/watch?v=HwCqsOis894&ab_channel=AsaProgrammer)

使用MERN技術棧(MongoDB、Express、React、node.js)
做Socket.io應用的練習。

## 功能
- 註冊、JWT登入
- 即時聊天
- 顯示上線用戶

### Setup
將專案 clone 到本地資料夾
```
git clone https://github.com/YD1234564789/realtime-chat.git
```
### Build the app
```
npm run build
```
建立.env：
```
PORT= "...."
NODE_ENV= "..."
MONGO_DB_UR= "MongoDB連線碼"
JWT_SECRET= "自行設置"
```
### Start the app
```
npm start
```

## 開發工具

Frontend：
- React
- TailwindCSS
- Daisy UI

Backend：
- Express
- JWT
- Mongoose
- Bcryptjs
- socket.io
