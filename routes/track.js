const express = require('express');
const auth = require('../middlewares/auth');
const { Track } = require('../models/Track');

const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const tracks = await Track.find({ userId: req.user._id });

        return res.status(200).send({ success: true, tracks });
    } catch (err) {
        return res.status(400).send({ success: false, error: err.message });
    }
});

router.post('/', auth, async (req, res) => {
    const { name, locations } = req.body;

    if (!name || !locations) {
        return res.status(400).send({
            success: false,
            error: 'You must provide a track name and locations !!'
        });
    }

    try {
        const track = new Track({ userId: req.user._id, name, locations });
        await track.save();

        return res.status(200).send({ success: true, track });
    } catch (err) {
        return res.status(400).send({ success: false, error: err.message });
    }
});

module.exports = router;
