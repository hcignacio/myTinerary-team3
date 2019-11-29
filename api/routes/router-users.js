const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const key = require("../../nodemon.json");
const jwt = require("jsonwebtoken");
const passport = require('../../passport');

router.get('/', passport.authenticate("jwt", { session: false }),
  (req, res) => {

    User.find()
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({ error: err })
      })
  });

router.post('/add',
  [check('mail').isEmail(),
  check('password').isLength({ min: 5 })
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!(errors.isEmpty())) {
      return res.status(422).json({ expressErrors: errors });
    }
    else {
      const user = new User({
        userName: req.body.userName,
        country: req.body.country,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        picture: req.body.picture,
        mail: req.body.mail
      })
      user
        .save(function (err) {
          if (err) {
            return res.status(400).json({ databaseErrors: err });
          }
          else {
            res.json('User added successfully')
          }
        });
    }
  });

router.post('/login',
  async function (req, res) {
    const email = req.body.email
    const password = req.body.password
    const userWithEmail = await findUserByEmail(email)

    if (userWithEmail) {
      if (userWithEmail.password === password) {
        const payload = {
          id: userWithEmail._id,
          username: userWithEmail.userName
        };
        const options = { expiresIn: 2592000 };
        jwt.sign(
          payload,
          key.secretKey,
          options,
          (err, token) => {
            if (err) {
              res.json({
                success: false,
                token: "There was an error"
              });
            } else {
              res.json({
                success: true,
                token: token
              });
            }
          }
        );
      }
      else {
        res.send('Wrong password')
      }
    }
    else {
      res.send('email not registered')
    }
  });



async function findUserByEmail(email) {
  try {
    return User.findOne({ 'mail': email.toLowerCase() })
  } catch (error) {
    throw new Error(`Unable to connect to the database.`)
  }
}

module.exports = router;