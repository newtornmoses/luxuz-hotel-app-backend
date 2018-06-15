const express = require('express');
const passport = require('passport');
const router = express.Router();

//get login form
router.get('/login', isLoggedin, (req, res) => {


    res.render('login');
});

// get sign up form
router.get('/signup', (req, res) => {
    res.render('signup');
});

// sign up
router.post('/signup', passport.authenticate('local.signup', {
        // successRedirect: ('/hotelluxuz/users/login'),
        failureRedirect: ('/hotelluxuz/users/signup'),
        failureFlash: true

    }),
    (req, res) => {
        res.redirect(req.session.url)
    }
);


// login

router.post('/login', passport.authenticate('local_login', {
        // successRedirect: ('/hotelluxuz/shop'),
        failureRedirect: ('/hotelluxuz/users/login'),
        failureFlash: true
    }),
    (req, res) => {
        res.redirect(req.session.url)
    }

);


//logout
router.get('/logout', (req, res) => {

    req.logout();

    res.redirect('back');
});


// protect routes

function isLoggedin(req, res, next) {
    if (req.isAuthenticated()) {
        req.flash('success', 'you are already logged in please !!!');
        res.redirect('/hotelluxuz/shop');

    } else {
        next();
    }
}


module.exports = router;