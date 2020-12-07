const router = require('express').Router();
const jwt = require('jsonwebtoken');
//users db Model
const userModel = require('../models/user');

const { registerValidationSchema, loginValidationSchema } = require('./validation');
//bcrypt
const bcrypt = require('bcryptjs');
const auth = require('./verify');



router.post('/register', async (req, res) => {
    //lets validate the data before creating User //joi will throw an object as return
    // const validation = Joi.validate(req.body, schema); //this i depricated in new verison of Joi
    const { error } = registerValidationSchema(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    //checking if user is already exists
    const emailExist = await userModel.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).json({ message: 'Email Already Exists' });
    }
    //bcrypt the password basically into hash format for security reasons
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hassedPassword
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

//LOGIN Route
router.post('/login', async (req, res) => {
    //validation
    const { error } = loginValidationSchema(req.body);
    if (error) {
        return res.status(400).json(error.details[0]);
    }
    //checking if user is already exists
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: 'Email or Password is Wrong' });
    }
    //if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).json({ message: 'Invalid Password or Email' });
    }
    const token = jwt.sign({ id: user._id }, 'secretkey');

    res.json({ token: token, user: user, message: "Login Successful" });
});

router.get('/', (req, res) => {
    userModel.find({}, (err, users) => {
        res.json({ users: users });
    });
});

router.get('/profile', auth, async (req, res) => {
    const user = await userModel.findOne({ _id: req.user });
    res.json({
        user: user
    });
});

module.exports = router;