const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const secretKey = 'super-secret';

const db = require("../data/database");

const router = express.Router();



// router.get("/signup", function (req, res) {
//   let sessionInputData = req.session.inputData;
//   if(!sessionInputData) {
//     sessionInputData = {
//       hasError: false,
//       email: '',
//       confirmEmail: '',
//       password: ''
//     };
//   }

//   req.session.inputData = null;
//   // res.render("signup", { inputData: sessionInputData });
// });

// router.get("/login", function (req, res) {
//   let sessionInputData = req.session.inputData;

//   if(!sessionInputData) {
//     sessionInputData = {
//       hasError: false,
//       email: '',
//       password: ''
//     };
//   }

//   req.session.inputData = null;
//   // res.render("login", { inputData: sessionInputData });
// });


router.post("/signup", async function (req, res) {
  const userData = req.body;
  console.log(userData);
  const enteredEmail = userData.email; // userData['email']
  const enteredPassword = userData.password;
  const enteredAge = userData.age;

  if (
    !enteredEmail ||
    !enteredPassword ||
    enteredPassword.trim().length < 6 ||
    !enteredEmail.includes("@")
  ) {

    // req.session.inputData = {
    //   hasError: true,
    //   message: 'Invalid input - please check your data',
    //   email: enteredEmail,
    //   password: enteredPassword
    // };

    // req.session.save(function() {
    //   res.redirect("/signup");
    // });
    return
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if(existingUser){
    // req.session.inputData = {
    //   hasError: true,
    //   message: 'User exists already!',
    //   email: enteredEmail,
    //   // confirmEmail: enteredConfirmEmail,
    //   password: enteredPassword
    // };
    // req.session.save(function() {
    //   res.redirect('/signup');
    // })
    return ;
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
    age: enteredAge
  };

  console.log("going to insert new user inserting");
  await db.getDb().collection("users").insertOne(user);
  console.log("inserted");


  res.status(200).json({ message: 'Login Successful' });
});

/*
router.post("/login", async function (req, res) {
  const userData = req.body;
  console.log(userData);
  const enteredEmail = userData.email; // userData['email']
  const enteredPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: 'Could not log in - please check your credentials!',
      email: enteredEmail,
      password: enteredPassword
    };
    // req.session.save(function() {
    //   res.redirect("/login");
    // });
    // return;
  }

  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: 'Could not log in - please check your credentials!',
      email: enteredEmail,
      password: enteredPassword
    };
    req.session.save(function() {
      res.redirect("/login");
    });
    return;
  }

  jwt.sign(userData, 'super-secret',{expiresIn: '1h'}, (err, accessToken) => {
    if(err){
      console.log(err);
    }
    res.json({accessToken});
  });


  // req.session.user = { id: existingUser._id, email: existingUser.email };
  // req.session.isAuthenticated = true;
  // req.session.save(function () {
  //   console.log("loggedin");
  //   // res.redirect("/profile");
  //   res.status(200).json({ message: 'Login Successful' });
  // });
});
*/



// router.get("/admin",async function (req, res) {
//   if(!res.locals.isAuth){ // if(!req.session.user)
//     return res.status(401).render('401');
//   }

//   if(!res.locals.isAdmin){
//     return res.status(403).render('403');
//   }

//   res.render("admin");
// });


router.post("/logout", function (req, res) {
  // req.session.user = null;
  // req.session.isAuthenticated = false;
  // res.redirect('/');
});

module.exports = router;
