const {
    login,
    register,
    addFriend,
    getFriendsList,
    delFriend,
    verifyFriends,
    findFriend,
    finUser,
    setUserData,
    agreeFriendApply,
    friendApply,
    isFindFriend
  } = require("./service/userService");
  const { createMsg, getChatHistory, searchChatHistory } = require("./service/msgService");
  const UserModel = require("./dao/Modole/UserModel");
  const { validateTokenSocket } = require('./middleware/auth');
  const auth = ['setUserData', 'getFriendsList']
  module.exports = function socketIo(io) {
    // 处理 Socket.io 连接
    const connectedUsers = new Map();
    io.on("connection", (socket) => {
      console.log("用户已连接" + socket.id);
      // 处理用户进入后修改信息
      socket.on("setUserData", async (userData, callback) => {
        try {
          const user_s = await finUser({
            fields: {
              username: userData?.username,
              password: userData?.password
            },
          });
          if (user_s.code !== 0) {
            return callback({ ...user_s, socketId: socket.id, username: userData?.username });
          }
          const result = await setUserData({
            fields: {
              userId: userData.id,
              updateFields: {
                types: userData?.types ? userData.types : 'online',
                socketId: userData?.types ? '' : socket.id
              }
            },
          });
          if (result.code === 0) {
            connectedUsers.set(socket.id, userData.id);
          }
          callback({ code: 0, socketId: socket.id });
          io.emit("getFriendsList", { code: 0, msg: 'updata' });
          // callback({...loggedInUser});
        } catch (error) {
          callback({
            code: -1,
            msg: "Error during login:",
            error,
          });
          console.error("Error during login:", error);
        }
      });
    
    
    });
  }