const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { encryptAadhaar } = require("../utils/crypto");
const { uploadOnCloudinary } = require("../config/cloudinary");
const jwtProvider = require("../utils/jwtProvider");
const userService = require("../services/Users");

const login = asyncHandler(async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await userService.getUserByEmail(email);
        console.log(JSON.stringify(user));
        if (user == null) {
            throw new Error("User not found");  
        }
        const passCheck = await bcrypt.compare(password,user.password_hash)
        if (!passCheck) {
            throw new Error("invalid password");  
        }
        console.log(user.user_id);
        const token = jwtProvider.generateToken(user.user_id);

        return res.status(200).send({ token, message: "login success",success:true,user});

    } catch (err) {
        throw new Error(err.message); 
    }
});

const register = asyncHandler(async (req, res) => {
  console.log(JSON.stringify(req.ip));

  try {
    const {
      first_name,
      middle_name,
      last_name,
      email,
      contact_number,
      password,
      birthdate,
      gender,
      state,
      aadhar_id,
    } = req.body;
   
    const existingUser = await userService.getUserByEmail(email);
    console.log(JSON.stringify(existingUser));
    if(existingUser != null){
      throw new Error("User with this email already exists");
    }
    // ---------------- AADHAAR ENCRYPTION ----------------
    const encryptedAadhaar = encryptAadhaar(aadhar_id);
    const hashedPassword = await bcrypt.hash(password, 10);

    // ---------------- AVATAR UPLOAD ----------------
    let avatar_url = null;
    if (req.files?.avatar?.[0]?.path) {
      const avatarUpload = await uploadOnCloudinary(
        req.files.avatar[0].path
      );
      avatar_url = avatarUpload?.url;
    }

    const user = await userService.createUser({
      first_name: first_name,
      middle_name: middle_name || null,
      last_name: last_name,
      email,
      password_hash: hashedPassword,
      birthdate: birthdate,
      gender,
      contact_number: contact_number,
      state,
      aadhar_id: encryptedAadhaar,
      avatar_url: avatar_url,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});


module.exports = { login, register};
