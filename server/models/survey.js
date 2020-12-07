let mongoose = require('mongoose');

let thirtyDaysFromNow = ()=>{
    // Gets the millisecond equivalent of 30 days from now
    let date = new Date(Date.now()+ 30*24*60*60*1000);
    return date;
};

let surveyModel = mongoose.Schema({
    authorName: String,
    authorID: String,
    surveyName: String,
    surveyDescription: String,
    authorPubDate: {type: Date, default: Date.now},
    activationDate: {type: Date},
    expiryDate: {type:Date}
},
{
    collection: "Surveys"
});


module.exports = mongoose.model('Survey', surveyModel);
