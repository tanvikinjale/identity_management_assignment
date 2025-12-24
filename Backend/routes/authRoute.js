const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController.js');
const upload = require('../middleware/multerMiddleware.js');

router.post("/register",
upload.fields([
    {name : "avatar",maxCount : 1},
]) , 
auth.register);

router.put("/login", auth.login);


module.exports = router;
