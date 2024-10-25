const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.json({ message: 'User already exists. Try logging in.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.json({ message: 'Signup successful!' });
});

// Login Route
router.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    const token = jwt.sign({ id: req.user._id }, 'your_jwt_secret');
    res.cookie('token', token, { httpOnly: true }); 
    return res.json({ message: 'Login successful', id: req.user._id });
});

// Logout Route
router.get('/logout', (req, res) => {
    req.logOut((err) => {
      if (err) {
        return res.status(500).send({ message: 'Logout failed' });
      }  
      console.log("Logout suceess")
      res.clearCookie('token');
      console.log(req.user)
      res.status(200).send({ message: 'Logout successful' });
    });
  });
  

router.get('/current-user', (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user)
        res.json(req.user);
    } else {
        res.json({ message: 'No user logged in' });
    }
});

module.exports = router;
