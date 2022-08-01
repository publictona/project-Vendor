const vendorModel = require("../models/vendorModel")
const aws = require("../aws/aws.js")
//const bcrypt = require("bcrypt")
const validator = require("../validator/validator.js")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')

const registerVendor = async function (req, res) {
    try {

        let data = req.body

        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "Bad Request, No Data Provided" })
        }

        // Profile Image Creation :-
        let files = req.files
        if (!files || files.length == 0) {
            return res.status(400).send({ status: false, msg: "No file found" })
        }
        const uploadedFileURL = await aws.uploadFile(files[0])
        data.profileImage = uploadedFileURL

        const { firstName, lastName, mobileNum, age, DOB, gender, profileImage, permanentAddress, city, pincode } = data

        // fname Validation :-
        if (!validator.isValid(firstName)) {
            return res.status(400).send({ status: false, msg: "firstName is required" })
        }

        if (!validator.isValid(lastName)) {
            return res.status(400).send({ status: false, msg: "lastName is required" })
        }

        if (!validator.isValid(mobileNum)) {
            return res.status(400).send({ status: false, msg: "mobileNum is required" })
        }

        if (!validator.isValid(age)) {
            return res.status(400).send({ status: false, msg: "age is required" })
        }

        if (!validator.isValid(DOB)) {
            return res.status(400).send({ status: false, msg: "DOB is required" })
        }

        if (!validator.isValid(gender)) {
            return res.status(400).send({ status: false, msg: "gender is required" })
        }

        if (!validator.isValid(profileImage)) {
            return res.status(400).send({ status: false, msg: "profileImage is required" })
        }
        // if (!validator.isValid(permanentAddress)) {
        //     return res.status(400).send({ status: false, msg: "permanentAddress is required" })
        // }

        // if (!validator.isValid(city)) {
        //     return res.status(400).send({ status: false, msg: "city is required" })
        // }

        // if (!validator.isValid(pincode)) {
        //     return res.status(400).send({ status: false, msg: "pincode is required" })
        // }

        let created = await vendorModel.create(data)
        res.status(201).send({ status: false, msg: "success", data: created })


    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "error.msg" })

    }
}
//========================================================login User+++++++++++++++++++++++++++++++++++++++++++++++++++++=====

  const loginVendor = async function (req, res) {
    try {
        const data = req.body;
        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "Bad Request, No Data Provided" })
        }

        const { mobileNum , OTP} = data;

        if (!validator.isValid(mobileNum)) {
            return res.status(400).send({ status: false, message: "mobileNum is required." });
        }

        if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobileNum.trim()))) {
            return res.status(400).send({ status: false, msg: "Please provide a valid mobileNum" })
        }

        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "Password is required." });
        }

        if (!(password.length >= 8 && password.length <= 15)) {
            return res.status(400).send({ status: false, msg: "Password Should be minimum 8 characters and maximum 15 characters", });
        }

        const matchUser = await userModel.findOne({ email })
        if (!matchUser) {
            return res.status(404).send({ status: false, message: " Email is Not Matched" });
        }

        let checkPassword = matchUser.password
        let checkUser = await bcrypt.compare(password, checkPassword)
        if (checkUser == false) {
            return res.status(400).send({ status: false, message: "Password is Incorrect" });
        }

        const token = jwt.sign(
            {
                userId: matchUser._id.toString(),
                Project: "Products Management",
                iat: new Date().getTime() / 1000   //(iat)Issued At- the time at which the JWT was issued.   
            },
            "Project-05_group-13",
            {
                expiresIn: "3600sec",
            });

        res.setHeader("Authorization", "Bearer")
        return res.status(200).send({ status: true, message: "User Logged in successfully", data: { userId: matchUser._id, token: token } });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};



//========================================= < Get Vendor Profile > =============================================

const getVendor = async function (req, res) {
    try {
        let vendorId = req.params.vendorId

        if (!validator.isValid(vendorId)) {
            return res.status(400).send({ status: false, msg: "vendorId is required to get vendor data" })
        }

        if (!mongoose.isValidObjectId(vendorId))
            res.status(400).send({ status: false, msg: "Please enter a valid vendorId" })

        let findVendor = await vendorModel.findById(vendorId)
        if (!findVendor) {
            return res.status(404).send({ status: false, message: "vendor not found" })
        }
        res.status(200).send({ status: true, msg: "User profile details", data: findVendor })

    }
    catch (err) {
        res.status(500).send({ status: false, msg: "err.message" })
    }
}


module.exports = {registerVendor,loginVendor,getVendor}

