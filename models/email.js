// const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const adminSentEmail = mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("Email",
adminSentEmail
// userRegistrationSchema
);