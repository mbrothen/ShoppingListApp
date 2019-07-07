const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotEvn = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const crudReposity = require('./database/crudRepository');

app.use(cors()/*able to add custom domains here*/);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

crudReposity.createConnection();

app.use('/api/v1/user', require('./routes/userRoutes'));

app.use('/profile', (req, res, next) => {
    res.send('<h2>Hello</h2>');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Api Start Page</h1>');
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});