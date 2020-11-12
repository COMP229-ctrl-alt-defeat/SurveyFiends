let mongoose = require('mongoose');

let answerModel = mongoose.Schema({
    questionsNumber: String,
    question: String,
    responderName: String,
    responderPubDate: {type: Date, default: Date.now},
    responderAnswer: Boolean
},
{
    collection: "Answers"
});

module.exports = mongoose.model('Answer', surveyModel);