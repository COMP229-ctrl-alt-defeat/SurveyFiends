let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Survey Model
let Survey = require('../models/survey');
let Question = require('../models/question');
let Answer = require('../models/survey');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home'});
});

/* GET About Us page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About'});
});

/* GET openSurveysList page. */
router.get('/openSurveysList', function(req, res, next) {
  let now = Date.now();
  Survey.find({expiryDate: {$gte: now}}).exec((err, openSurveys)=>{
    if(err){
      return console.log(err);
    }else{
      res.render('openSurveys/openSurveysList', { title: 'Open Surveys', Surveys: openSurveys});
    };
  });
});

// GET selected survey page
router.get('/openSurveysList/:id', (req, res, err)=>{
  let surveyid = req.params.id;
  Survey.findById(surveyid, (err, survey) => {
    if(err){
      return console.log(err);
    }else{
      Question.find({surveyID: surveyid}).sort('questionsNumber').exec((err, SurveyQuestions)=>{
        if(err){
          return console.log(err);
        }else{
          res.location(SurveyQuestions[0]._id);
          res.render('openSurveys/displaySurvey',{title:'Open Surveys', Survey: survey, Questions: SurveyQuestions});
        }
      })
    }
  })
})


router.post('/openSurveysList/:id', (req, res, err)=>{
  
});

module.exports = router;
