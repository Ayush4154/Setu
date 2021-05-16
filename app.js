const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();
const cors = require('cors');
app.use(fileUpload());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '250mb', extended: true }));
app.use(cors());

const RegistrationController = require('./controller/registration.controller');
const registration = new RegistrationController();

app.post('/register', registration.register);

app.listen(3200, () => {
    console.log('Listening to port: 3000');
});

