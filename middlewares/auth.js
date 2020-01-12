const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res
            .status(401)
            .send({ success: false, error: 'You must be logged in !!' });
    }

    const token = authorization.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, 'JWT');
        const { userId } = decoded;
        const user = await User.findById(userId);
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send({ success: false, error: 'Invalid token !!' });
    }
};
