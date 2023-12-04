const express = require('express');
const router = express.Router();
const SignupModel = require('../Models/Signup');

router.post('/signup', (req, res) => {
    SignupModel.create(req.body)
    .then(signup=>res.json(signup))
    .catch(err=>res.json(err))
});

router.get('/getUserProfile/:id', (req, res) => {
    const id =req.params.id;
    SignupModel.findById({_id:id})
    .then(signup=>res.json(signup))
    .catch(err=>res.json(err))
});

router.put('/updateUserProfile/:id', (req, res) => {
    const id =req.params.id;
    SignupModel.findByIdAndUpdate({_id:id},{username:req.body.username, email:req.body.email, password:req.body.password, confirmpassword:req.body.confirmpassword})
    .then(signup=>res.json(signup))
    .catch(err=>res.json(err))
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await SignupModel.findOne({ email, password });
        if (user) {
            res.json({ success: true, message: 'Login successful', user: user });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
