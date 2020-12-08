let express = require('express');
let router = express.Router();

// setting up access to survey, questions, answers
let Survey = require('../models/survey');
let Question = require('../models/question');
let Answer = require('../models/answer');

// setting up pdfKit to generate pdf
let pdfDoc = require('pdfkit');

router.get('/:id', (req, res, next) => {
    let surveyID = req.params.id;
    console.log('Generating pdf for: ' + surveyID);


    // getting results
        // get the survey
    Survey.findById(surveyID, (err, survey) =>{
        console.log(survey);
        //get all quesitons associated with survey
        Question.find({surveyID: surveyID}).sort('questionsnumber').exec((err, surveyQuestions) => {
          console.log(surveyQuestions);
          //get all answers associated with survey
          Answer.find({surveyID: surveyID}).exec((err, answersList)=>{
            console.log(answersList);
            
            let pdf = new pdfDoc();
            pdf.text('Survey Name: ' + survey.surveyName);

            for( let questionCount = 0; questionCount < surveyQuestions.length; questionCount++){
                let trueCount = 0;
                let falseCount = 0;
                for(let answerCount =0; answerCount < answersList.length; answerCount++){
                    if(answersList[answerCount].questionID == surveyQuestions[questionCount].questionID){
                        if(answersList[answerCount] == true){
                            trueCount++;
                        }else{
                            falseCount++;
                        }
                    }
                }
                pdf.text(surveyQuestions[questionCount].question)
                pdf.text('True : ' + trueCount);
                pdf.text('False : ' + falseCount);
            }

            pdf.pipe(res);

            pdf.end();

          })
        })
      })


    
})


module.exports = router;