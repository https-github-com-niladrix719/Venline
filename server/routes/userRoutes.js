const express = require('express');
const {registerUser,authUser} = require("../controllers/Con_controller");
const router = express.Router();
console.log(`registerUser${registerUser}`)
router.post('/',registerUser);
router.post('/login',authUser)
module.exports = router;