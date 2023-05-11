require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { router } = require('./routes');
const CallDB = require('./database/connect');

const app = express();
const port = process.env.PORT;
const callDB = new CallDB();
callDB.connectToDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use(router);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
