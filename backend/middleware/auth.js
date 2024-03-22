// Handle authentication under HTTP request and 
// WebSocket request for both initial and continuous
// authentication status updates
const jwt = require("jsonwebtoken");
const UserModel = require('../dao/Modole/UserModel');
const {config} = require('../config/index.js');

module.exports = {
    // Authentication under HTTP request
    validateToken: async (req,res,next) => {
        try {
            let token = (req.headers.authorization)
            const decoded = jwt.verify(token, config.jwtc.jwtSecret);
            // Query the user by username and password
            const user = await UserModel.findOne({
                where:{
                    username: decoded.username,
                    id: decoded.id
                }
            });
            if (!user) {
                throw new Error('User not found');
            }
            req.user = user;
            next();
        } catch (err) {
            console.log(err);
            res.status(401).json({
                code: 401,
                error: 'Invalid token'
            });
        }
    },

    // Authentication under WebSocket connection
    validateTokenSocket: async (token) => {
        try {
            const decoded = jwt.verify(token, config.jwtc.jwtSecret);
            // Query the user by username and password
            const user = await UserModel.findOne({
                where:{
                    username: decoded.username,
                    id: decoded.id
                }
            });
            if (!user) {
                throw new Error('User not found');
            }
            return {...user,code:0}; 
        } catch (err) {
            console.log(err);
            return({
                code: 401,
                error: 'Invalid token'
            });
        }
    },
}
