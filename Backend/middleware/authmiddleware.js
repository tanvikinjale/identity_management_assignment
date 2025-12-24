
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const userService = require('../services/Users.js');


const authMiddleware = asyncHandler(async(req, res, next) => {
    let token;
        // Check if token is provided
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try{
            if(token){
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                console.log(decoded);
                const [user] = await userService.findUserById(decoded?.user_id);
                req.user = user;
                next();
            }
        }catch (err){
            throw new Error('Invalid token.');
        }
    }else{
        throw new Error('Access denied. No token provided.');
 
    }       

});

module.exports = {authMiddleware};
