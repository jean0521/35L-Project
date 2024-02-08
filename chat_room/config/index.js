// 链接数据库
module.exports.config = {
    mysql: {
        host: '127.0.0.1',
        port: 3306,
        user: 'chatRoom',
        password: '123456',
        database: 'chatroom'
    },
    jwtc:{
        sessionSecret: "abcdefghigklmnABCDEFGHIGKLMN1234567890",
        jwtSecret: "abcdefghigklmnABCDEFGHIGKLMN1234567890"
    }
}
