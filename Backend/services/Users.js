const db = require("../config/db.js");
const { getuser_idFromToken } = require("../utils/jwtProvider.js");

const createUser = async (userData) => {
 try{
  const [result] = await db.query(
    `
    INSERT INTO users (
      first_name,
      middle_name,
      last_name,
      email,
      password_hash,
      birthdate,
      gender,
      contact_number,
      state,
      aadhar_id,
      avatar_url
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      userData.first_name,
      userData.middle_name,
      userData.last_name,
      userData.email,
      userData.password_hash,
      userData.birthdate,
      userData.gender,
      userData.contact_number,
      userData.state,
      userData.aadhar_id,
      userData.avatar_url,
    ]
  );

  const [user] = await db.query(
    "SELECT user_id, email, first_name, last_name FROM users WHERE user_id = ?",
    [result.insertId]
  );

  return user[0];
}catch(err){
        throw new Error(err.message); 
}
};


const findUserById = async(user_id) => {
    try{
        const sql = "select * from users where user_id = ?;";
        const [user] = await db.query(sql, [user_id]);
            if(!user){  
                throw new Error("User Not Found ");
            }else{   
                return user;
            }
    }catch(err){
        throw new Error(err.message); 
    }

};

 
const getUserByEmail = async (email) => {
    try {
        const sql = "SELECT * FROM users WHERE email = '"+email+"';";
        const [result] = await db.query(sql);
    
        return result.length > 0 ? result[0] : null; 
        
    } catch (err) {
        throw new Error(err.message);
    }
};

const getUserProfileByToken = async(token) => {
   try{
    const [user_id] = await getuser_idFromToken(token);
    const user = await findUserById(user_id);

    return user;
   } catch(error) {
     throw new Error(error.message); 
   }

};


module.exports = { createUser, getUserProfileByToken, findUserById, getUserByEmail };

