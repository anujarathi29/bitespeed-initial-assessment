const mongoose = require("mongoose")

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

module.exports = mongoose.model("contact", ContactSchema)