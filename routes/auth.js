const express = require('express');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ userId: user._id }, 'JWT', {
            expiresIn: 3600
        });

        return res.status(200).send({success: true, token});
    } catch (err) {
        return res.status(400).send(err.message);
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send({
            success: false,
            error: 'Email or password must be provided !!'
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .send({ success: false, error: 'Email not found !!' });
        }

        const validPassword = await user.comparePassword(req.body.password);
        if (!validPassword)
            return res
                .status(400)
                .send({ success: false, error: 'Incorrect password !!' });

        const token = jwt.sign({ userId: user._id }, 'JWT', {
            expiresIn: 3600
        });
        return res.status(200).send({success: true, token});

    } catch (err) {
        return res
            .status(400)
            .send({ success: false, error: 'Something went wrong !!' });
    }
});

module.exports = router;
