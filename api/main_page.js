const express = require('express');
const router = express.Router();








router.get('/rooms&suites', (req, res) => {
    //store current url
    req.session.url = req.originalUrl;
    res.render('rooms&suites');
});


//customer get in touch
router.post('/customerEmail', (req, res) => {
    const {
        name,
        email,
        message

    } = req.body

    const customerEmail = new Msg({
        name,
        email,
        message
    });


    console.log(customerEmail);
    customerEmail.save((err, msg) => {


        if (err) {
            req.flash('danger', 'sorry me try again');
            res.redirect('/hotelluxuz/hotel/rooms')
        }
        req.flash('success', 'message sent successfully..we shall respond soon')
        res.redirect('back')
    });
});






module.exports = router;