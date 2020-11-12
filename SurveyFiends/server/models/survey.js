let mongoose = require('mongoose');

let surveyModel = mongoose.Schema({
    authorName: String,
    surveyName: String,
    authorPubDate: {type: Date, default: Date.now}
},
{
    collection: "Surveys"
});


module.exports = mongoose.model('Survey', surveyModel);
