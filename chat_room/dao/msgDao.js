const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const MsgModl = require("./Modole/MsgModl");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("../config/index");

module.exports = {
  // 添加聊天记录
  async createMsg(user) {
    let result = await MsgModl.createMsg(user);
    return result;
  },
  // 发信息
  async sendMsg(user) {
    try {
      await MsgModl.create(user);
      return {
        code: 0,
        msg: "message sent",    // 发送成功！
      };
    } catch (error) {
      return {
        code: -1,
        msg: "sent fails",    // 发送失败！
        data: error,
      };
    }
  },
  // 获取聊天信息 
  getChatHistory(user) {
    return MsgModl.getChatHistory(user);
  },
  searchChatHistory(user) {
    return MsgModl.searchChatHistory(user);
  },
  // 返回id
  async GetMsgId(data) {
    let result = await MsgModl.findAndCountAll({
      order: [["sortId", "asc"]],
      where: {
        [Op.or]: [
          { userId: data.userId, friendId: data.friendId },
          { userId: data.friendId, friendId: data.userId },
        ],
      },
    });
    if (!result) {
      return {
        code: -1,
        msg: "search fails",   // 查询失败！
      };
    } else {
      return {
        code: 0,
        msg: "search complete",     // 查询成功！
        data: result,
      };
    }
  },

};
