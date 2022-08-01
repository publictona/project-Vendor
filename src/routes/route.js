const express = require('express');
const router = express.Router()

const vendorController = require("../controllers/vendorController")
//const { userAuth } = require('../middleware/auth')



//@ vendor ROUTE HANDLER
router.post('/register', vendorController.registerVendor)
router.post('/login', vendorController.loginVendor)
router.get('/vendor/:vendorId/profile',  vendorController.getVendor)





module.exports = router