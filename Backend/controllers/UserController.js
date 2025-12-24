const db = require("../config/db.js");
const asyncHandler = require("express-async-handler");
const { decryptAadhaar } = require("../utils/crypto");

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user_id = req.user.user_id;

  try {
    const sql = `
      SELECT 
        user_id,
        first_name,
        middle_name,
        last_name,
        email,
        contact_number,
        gender,
        state,
        aadhar_id,
        birthdate,
        avatar_url,
        created_at
      FROM users
      WHERE user_id = ?
      LIMIT 1
    `;

    const [rows] = await db.query(sql, [user_id]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = rows[0];

    //  Decrypt Aadhaar
    if (user.aadhar_id) {
      user.aadhar_id = decryptAadhaar(user.aadhar_id);
    }

    // Format dates
    if (user.birthdate) {
      user.birthdate = new Date(user.birthdate)
        .toISOString()
        .split("T")[0];
    }

    if (user.created_at) {
      user.created_at = new Date(user.created_at)
        .toISOString()
        .split("T")[0];
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
});

const getUserProfileById = asyncHandler(async(req,res,next)=>{

    const user_id = req.params.id;
    console.log(JSON.stringify(user_id));
    try{
        const sql = "select * from users where user_id = ?;";
        const [user] = await db.query(sql, [user_id]);
            if(!user){  
                throw new Error("User Not Found ");
            }else{   
           return res.status(200).send(user)
}
       }catch(err){
         next(err) ;
       }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const user_id = req.user.user_id; 
    const {
      first_name,
      middle_name,
      last_name,
      email,
      contact_number,
      gender,
      state,
      birthdate,
    } = req.body;

    const formattedBirthdate = birthdate
  ? new Date(birthdate).toISOString().split("T")[0]
  : null;


    const sql = `
      UPDATE users 
      SET 
        first_name = ?,
        middle_name = ?,
        last_name = ?,
        email = ?,
        contact_number = ?,
        gender = ?,
        state = ?,
        birthdate = ?,
        updated_at = NOW()
      WHERE user_id = ?
    `;

    await db.query(sql, [
      first_name,
      middle_name || null,
      last_name,
      email,
      contact_number,
      gender,
      state,
      formattedBirthdate,
      user_id
    ]);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile"
    });
  }
});


// deleteUser
const deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        const sql = "DELETE FROM users WHERE user_id = ?";
        await db.query(sql, [id]);
        
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        next(err);
    }
});



module.exports = { getUserProfile, getUserProfileById, updateUser, deleteUser };

