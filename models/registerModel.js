const { BSON, BSONSymbol } = require("mongodb");
const mongoose = require("mongoose");

const userRegistrationSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    image:{
        
    },
    phoneno:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
      report:{
        
      },
      grade:{
        type:String,
       required:true
      },
      specialization:{
       type:String,
       required:true
      },
      experience:{
        type:String,
        required:true
      },
      linkedinaccount:{
        type:String,
        required:true
      },
      resume:{
        
    }
});

module.exports = mongoose.model("Details",userRegistrationSchema);