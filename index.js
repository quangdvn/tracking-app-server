const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./routes/auth');
const tracks = require('./routes/track');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', auth);
app.use('/api/tracks', tracks);

const mongoUri =
    'mongodb+srv://quangdvn:z1x2c3v4@tracking-app-server-2ymzl.mongodb.net/tracking-app?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () =>
    console.log('Connected to mongoDb ...')
);

mongoose.connection.on('error', err =>
    console.error('Error connecting to mongoDb ...', err)
);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to my tracking server ...');
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`App run on port 3000`);
});
