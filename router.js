const express = require('express')
const router = express.Router();

// User Details-----

const credential = {
    email: 'parvesh@gmail.com',
    password: '123'
}
// --------------------

// login user

router.post('/login', (req, res) => {
    if (req.body.email == credential.email &&
        req.body.password == credential.password) {
        req.session.user = req.body.email;

        res.redirect('/route/dashboard')
    } else {
        res.render('base', { invalid: "Invalid email Or Password" })
    }
})
// --------------------

// Route for Dashboard -------

router.get('/dashboard', (req, res) => {

    if (req.session.user) {
        res.render('dashboard', { user: req.session.user })
    } else {
        res.redirect('/login')
    }
})
// -------------------------

//  Route for Logout

router.get('/logout', (req, res) => {
    req.session.user = false;
    res.render('base', { title: "Express", logout: 'Logout Successfull...!' })
})
// ----------------------------

module.exports = router;
