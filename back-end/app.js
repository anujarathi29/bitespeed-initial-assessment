const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')

const app = express()
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

mongoose.connect("mongodb://localhost:27017/database")
    .then(() => { console.log("connected to the database"); })
    .catch((err) => console.log("Failed to connect to the database", err))

const ContactSchema = mongoose.Schema({
    _id: Number,
    email: String,
    phoneNumber: String,
    linkedId: Number,
    linkPrecedence: String,
    deletedAt: { type: Date, default: null }
},
    {
        timestamps: true
    }
)



const ContactModel = mongoose.model("contact", ContactSchema)

app.post("/identify", (req, res) => {

    var emails = []
    var secIds = []
    var phoneNumbers = []

    var data = req.body

    // if(!data.email || !data.phoneNumber) {
    //     res.status(400).json({
    //         error: {
    //             message: "Email or phone number cannot be empty"
    //         }
    //     })
    // }

    async function getCount() {
        var idcount = await ContactModel.countDocuments()
        return idcount
    }

    
    async function getData() {
        var dbData = await ContactModel.find({ $or: [{ "email": { $eq: data.email }},{ "phoneNumber": { $eq: data.phoneNumber }},{ $and: [{ "email": { $eq: data.email } }, { "phoneNumber": { $eq: data.phoneNumber } }] }] })
        console.log("Return of getData: ", dbData);
        return dbData
    }

    async function printData() {
        try {
            var dbData = await getData()
            dbData.forEach(index => { emails.push(index.email) })
            emails = [...new Set(emails)]
            console.log("Emails: ", emails);
            dbData.forEach(index => phoneNumbers.push(index.phoneNumber))
            phoneNumbers = [...new Set(phoneNumbers)]
            console.log("PhoneNumbers: ", phoneNumbers);
            for (var i = 1; i < dbData.length; i++) {
                secIds.push(dbData[i]._id)
            }
            secIds = [...new Set(secIds)]
            console.log("Secondary Ids: ", secIds);
            res.send({
                contact:
                {
                    primaryContactId: dbData[0]._id,
                    emails: emails,
                    phoneNumbers: phoneNumbers,
                    secondaryContactIds: secIds

                }
            })
        }
        catch (error) {
            console.log("Error in printing the data: ", error);
        }
    }

    async function createData() {
        if (!data.email){
            ContactModel.create({ "_id": await getCount() + 1, "email": null, "phoneNumber": data.phoneNumber, "linkedId": null, "linkPrecedence": "primary" })
            .then(status => {
                console.log("Status", status)
                printData()
            })
            .catch(err => {
                console.log("Error while saving the data to the database!", err);
                res.send({ msg: "Failed to save the data" })
            })
        } else if (!data.phoneNumber){
            ContactModel.create({ "_id": await getCount() + 1, "email": data.email, "phoneNumber": null, "linkedId": null, "linkPrecedence": "primary" })
            .then(status => {
                console.log("Status", status)
                printData()
            })
            .catch(err => {
                console.log("Error while saving the data to the database!", err);
                res.send({ msg: "Failed to save the data" })
            })
        } else {
            ContactModel.create({ "_id": await getCount() + 1, "email": data.email, "phoneNumber": data.phoneNumber, "linkedId": null, "linkPrecedence": "primary" })
            .then(status => {
                console.log("Status", status)
                printData()
            })
            .catch(err => {
                console.log("Error while saving the data to the database!", err);
                res.send({ msg: "Failed to save the data" })
            })
        }
    }

    async function createSecondary(id) {

        if (!data.email){
            ContactModel.create({ "_id": await getCount() + 1, "email": null, "phoneNumber": data.phoneNumber, "linkedId":id,  "linkPrecedence": "secondary" })
            .then(status => {
                console.log("Status", status)
                printData()
            })
            .catch(err => {
                console.log("Error while saving the data to the database!", err);
                res.send({ msg: "Failed to save the data" })
            })
        } else if (!data.phoneNumber){
            ContactModel.create({ "_id": await getCount() + 1, "email": data.email, "phoneNumber": null, "linkedId":id,  "linkPrecedence": "secondary" })
            .then(status => {
                console.log("Status", status)
                printData()
            })
            .catch(err => {
                console.log("Error while saving the data to the database!", err);
                res.send({ msg: "Failed to save the data" })
            })
        } else {
            ContactModel.create({ "_id": await getCount() + 1, "email": data.email, "phoneNumber": data.phoneNumber, "linkedId":id,  "linkPrecedence": "secondary" })
            .then(status => {
                console.log("Status", status)
                printData()
            })
            .catch(err => {
                console.log("Error while saving the data to the database!", err);
                res.send({ msg: "Failed to save the data" })
            })
        }
    }

    async function updateData() {
        try {
            var data = await getData()
            for (var i = 1; i < data.length; i++) {
                ContactModel.updateOne(data[i], { $set: { "linkedId": data[0].id, "linkPrecedence": "secondary" } })
                    .then(status => {
                        console.log("Status", status)
                    })
                    .catch(err => {
                        console.log("Error while updating the data to the database!", err);
                    })
            }
            printData()
        }
        catch (err) {
            console.log("Error while updating the database", err);
        }
    }

    async function IdentifyData() {
        try {
            var dbData = await getData()
            console.log("dbData Length", dbData.length);
            if (dbData.length > 0 && dbData.length < 2) {
                if (data.email == dbData[0].email && data.phoneNumber == dbData[0].phoneNumber) {
                    res.send({ contact: { primaryContactId: dbData[0]._id, emails: [dbData[0].email], phoneNumbers: [dbData[0].phoneNumber], secondaryContactIds: [dbData[0].linkedId] } })
                }else{
                    createSecondary(dbData[0]._id)
                }
            }
            else if (dbData.length >= 2) {
                dbData.forEach(index => {
                    if (index.linkPrecedence == "secondary") {
                        printData()
                    }
                    else {
                        updateData()
                    }
                })
            }
            else {
                
                    createData()
            }
        }
        catch (err) {
            console.log("Error in identifying", err)
        }
    }

    IdentifyData()

})


app.listen(8000, function () {
    console.log("Server started at port localhost:8000");
})
