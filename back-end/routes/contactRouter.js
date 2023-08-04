const express = require("express")
const router = express.Router()

const contactController = require("../controller/contactController.js") 

router.post("/",contactController.IdentifyContact);

module.exports = router