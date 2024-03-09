const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
// sequelize.query('ALTER TABLE Users ADD COLUMN types STRING DEFAULT "offline";');
// sequelize.query('ALTER TABLE Users ADD COLUMN socketId STRING ;');

const UserModel = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      // 1 正常 Normal
      defaultValue: "1",
    },
    types: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // 1 online offline
      defaultValue: "offline",
    },
    socketId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true, // 启用时间戳 use timestamps
  }
);
const Friendship = sequelize.define("Friendship", {
  // 好友关系模型定义 define Friendship 
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: "id",
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    // "pending": 待验证, "accepted": 已接受, "rejected": 已拒绝
    defaultValue: "pending",
  },
  status_is: {
    type: DataTypes.STRING,
    allowNull: false,
    // "0": 删除, "1": 正常
    defaultValue: "1",
  },
  // 备注
  notes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // 申请标题
  marks: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
UserModel.belongsToMany(UserModel, {
  through: Friendship,
  as: "Friends",
  foreignKey: "userId",
  otherKey: "friendId",
});
// 添加好友
UserModel.addFriend = async function (data) {
  try {
    // 检查是否已存在好友关系记录
    const existingFriendship = await Friendship.findOne({
      where: {
        userId: data.userId,
        friendId: data.friendId,
      },
    });

    if (existingFriendship) {
      // 已存在好友关系记录，可以处理一些逻辑，例如提示用户已经是好友
      return {
        code: -1,
        msg: "请勿重复申请",
        success: false,
        message: "请勿重复申请",
      };
    }

    // 使用 Sequelize 自动生成的 addFriends 方法添加好友关系
    await Friendship.create(data);
    //await Friendship.create({...data,userId:data.friendId,friendId:data.userId});

    // 返回成功的消息或其他信息
    return {
      code: 0,
      msg: "申请成功",
      success: true,
      message: "Friend added successfully.",
    };
  } catch (error) {
    // 处理错误，返回错误消息或其他信息
    console.log(error);
    return {
      code: -1,
    // 申请失败
      msg: "Request Failure",
      success: false,
      message: "Error adding friend.",
    };
  }
};
// 获取好友列表
UserModel.getFriendsList = async function (data) {
  try {
    const user = await UserModel.findOne({
      where: { id: data.userId },
      include: [
        {
          model: UserModel,
          as: "Friends",
          attributes: ["id", "username", "types", "socketId"],
          through: {
            // attributes: [], // 如果不需要返回 Friendship 表的字段，设置为空数组
          },
          where: {
            "$Friends.Friendship.status$": "accepted",
            "$Friends.Friendship.status_is$": 1,
            [Op.or]: [
              { "$Friends.Friendship.userId$": data.userId },
              { "$Friends.Friendship.friendId$": data.userId },
            ],
          },
        },
      ],
    });

    // 返回好友列表
    return { code: 0, msg: "成功", success: true, friends: user?.Friends || [] };
  } catch (error) {
    console.error("Error getting friends:", error);
    return {
      code: -1,
    // 失败
      msg: "Failure",
      success: false,
      message: "Error getting friends. " + error.message,
    };
  }
};
