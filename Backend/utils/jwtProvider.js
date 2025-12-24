const jwt = require('jsonwebtoken');

const generateToken = (user_id)=>{
    //let payload = { "id" : "1"};
    let token = jwt.sign({ user_id: user_id},process.env.SECRET_KEY ,{ expiresIn: "3d" });
    return token;
};


module.exports = {generateToken}
