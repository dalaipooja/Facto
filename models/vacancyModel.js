const mongoose = require('mongoose');

const VacancyDetails = mongoose.Schema({
    vacancyname:{
        type: String,
        required:true
    },
    qualification:{
        type: String,
        required:true
    }, 
    stream:{
        type: String,
        required:true
    },
    experience:{
        type: String,
        required:true
    }
    // ,
    // salary:{
    //     type:String,
    //     required:true
    // }
});



module.exports = mongoose.model("Vacancy",VacancyDetails);