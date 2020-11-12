let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Survey Model
let Survey = require('../models/survey');
let Question = require('../models/question');
let Answer = require('../models/survey');

/* GET Route for the Survey List page - READ OPeration */
router.get('/', (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(surveyList);

            res.render('survey/list', {title: 'Survey List', SurveyList: surveyList});           
        }
    });
});

router.get('/add', (req, res, next) => {
 
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(surveyList);

            res.render('survey/details', {title: 'Add New Survey', SurveyList: surveyList});            
        }
     });
  
});

router.post('/add', (req, res, next) => {
    let newSurvey = Survey({
        "authorName": req.body.name,
        "surveyName": req.body.author,
        "surveyQuestion": req.body.question //may need to delete
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            //refresh list by redirec
            res.redirect('/survey-list');
        }
    });
});

router.get('/:id', (req, res, next) => {
  
    //Finding specified book by ID and passing it to details view
    let id = req.params.id;
  
    
    Survey.findById(id, (err, surveyToEdit) =>{
        if(err)
        {
            console.log(err);
            res.end(err); 
        }
        else
        {
            res.render('survey/details', {title: 'Edit Survey Details', SurveyList: surveyToEdit});
        }
    });
  });
  
  // POST - process the information passed from the details form and update the document
  router.post('/:id', (req, res, next) => {
  
    //Transfer of new book values/edited book values to the book that matches the passed ID
    let id = req.params.id;
  
    let editedSurvey = Survey({
      "_id": id,
      "authorName": req.body.name,
      "surveyName": req.body.author,
    });
  
    Survey.updateOne({_id: id}, editedSurvey, (err) =>{
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
        {
          res.redirect('/survey-list');
        }
     });
  });
  
  router.get('/:id/addQuestions', (req, res, next) => {

    Question.find( (err, questionList) =>{
        if(err)
        {
            console.log(err);
            res.end(err); 
        }
        else
        {
            res.render('survey/addQuestions', {title: 'Add Questions'});
        }    
    });
  });

  
  router.post('/:id/addQuestions', (req, res, next) => {
  
    let id = req.params.id;
  
    let newQuestion = Question({
      "surveyID": id,
      "questionsNumber": req.body.questionsNumber,
      "question": req.body.question
    });
  
    Question.create(newQuestion, (err, Question) =>{
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
        {
          res.redirect('/survey-list');
        }
     });
  });
  
  router.get('/:id/editQuestions', (req, res, next) => {
  
    let id = req.params.id;
  
    Survey.findById(id, (err, surveyToEdit) =>{
        if(err)
        {
            console.log(err);
            res.end(err); 
        }
        else
        {
            res.render('survey/addQuestions', {title: 'Add Questions', SurveyList: surveyToEdit});
        }
    });
  });
  
  // POST - process the information passed from the details form and update the document
  router.post('/:id/editQuestions', (req, res, next) => {
  
    //Transfer of new book values/edited book values to the book that matches the passed ID
    let id = req.params.id;
  
    let editQuestion = Question({
      "surveyID": id,
      "questionsNumber": req.body.questionsNumber,
      "question": req.body.question,
    });
  
    Question.updateOne({surveyID: id}, editQuestion, (err) =>{
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
        {
          res.redirect('/survey-list');
        }
     });
  });
  
  // GET - process the delete by user id
  router.get('/delete/:id', (req, res, next) => {
  
    //removal of book that matches passed ID
    let id = req.params.id;
  
    Survey.remove({_id: id}, (err) =>{
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else 
      {
      res.redirect('/survey-list')
      }
    });
  
  });
  
  

module.exports = router;