const express = require('express');
const router = express.Router();
const user = require("../controllers/UserController");
const {authMiddleware} = require("../middleware/authMiddleware");


router.get("/", authMiddleware, user.getUserProfile);
router.get("/:id", authMiddleware, user.getUserProfileById);
router.put("/updateuser", authMiddleware, user.updateUser);
router.delete("/:id", authMiddleware , user.deleteUser);

module.exports = router;
