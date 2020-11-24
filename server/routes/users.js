var express = require('express');
const passport = require('passport');
var router = express.Router();
var user = require('../models/user');
let User = user.userAccountModel;

/* GET User Registration */
router.get('/register', function(req, res, next) {
  res.render('register',{
    title:"Registration",
    statusText:"",
    isLoggedIn:req.user
  });
});

/* GET User Login */
router.get('/login', function(req, res, next) {
  console.log("LOGGED IN: "+req.session.isLoggedIn);
  if(req.session.isLoggedIn==true)
    res.redirect("/survey-list");

  res.render('login',{
    title:"Login",
    statusText:"",
    isLoggedIn: req.user
  });
});

/* POST User Registration */
router.post('/register', function(req, res, next) {

  var name=req.body.username;
  var email=req.body.email;
  var password=req.body.password;
  var cpassword=req.body.cpassword;

  if(name && email && password){
    //Passwords are equal
    if(password===cpassword){
      /*
      User.create({
        name: name,
        email: email,
        password: password
      }, (err, doc)=>{
        if(err){
          res.render('register',{
            title:"Registration",
            statusText:"Failed to Register (Internal Error)", isLoggedIn:(req.session.isLoggedIn)?true:false
          });
        } 
        else{
          res.render('register',{
            title:"Registration",
            statusText:"User Created", isLoggedIn:(req.session.isLoggedIn)?true:false
          });
        }
      });
      */

      let newUser = new User({
        username: name,
        email: email
      });
      
      User.register(newUser, password, (err, user)=>{
        if (err){
          console.log("Error: Creating new User");
          if(err.name == "UserExistsError"){
            console.log("User already exists");
          };
          return res.render('register',{
            title:"Registration",
            statusText:"Failed to Register (internal Error)",
            isLoggedIn:req.user
          });
        };
        passport.authenticate('local')(req, res, ()=>{
            res.redirect('/survey-list');
        });
        
      })


    }
    else{
      res.render('register',{
        title:"Registration",
        statusText:"Passwords do not match",
        isLoggedIn: req.user
      });
    }
  }
  //Fields are empty
  else{
    res.render('register',{
      title:"Registration",
      statusText:"All Fields are required",
      isLoggedIn: req.user
    });
  }
});

/* POST User Login */
router.post('/login', function(req, res, next) {
 
 // Using PassportJS instead
 /* 
  var email=req.body.email;
  var password=req.body.password;

  User.findOne({
    email:email,
    password:password
  },(err, doc)=>{
    if(err || !doc){
      //Failed to Login
      res.render('login',{
        title:"Login",
        statusText:"Credentials Invalid", isLoggedIn:(req.session.isLoggedIn)?true:false
      });
    }
    else{
      //Logged In
      req.session.email=doc.email;
      req.session.isLoggedIn=true;

      req.session.save(()=>{
        res.redirect("/survey-list");
      });
    }
  });
*/

 passport.authenticate('local', (err, user, info) => {
  if (err) {
      return next(err);
  }
  if (!user) {
      req.flash('loginMessage', 'Authentication Error');
      res.render('login',{
        title:"Login",
        statusText:"Login Failed",
        isLoggedIn: req.user
      });
  }
  req.login(user, (err) => {
      if (err) {
          return next(err);
      }
      console.log("logged in as " + req.user.username);
      return res.redirect('/survey-list');
  })
  })(req, res, next);

});

/* POST Logout */
router.get('/logout', (req,res,next)=>{
  /*
  req.session.destroy(function(err) {
    res.redirect('/users/login');
  }); */

  req.logout();
  res.redirect('/users/login')
});


module.exports = router;
