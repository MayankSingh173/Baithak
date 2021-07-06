require('dotenv').config({path: '.env'});

const express = require('express');

var admin = require('firebase-admin');

var serviceAccount = require('./firebaseAdmin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const PORT = 5000;

const app = express();

app.use(express.json());

const {nocache} = require('./src/controllers/Cache/index');
const {generateAccessToken} = require('./src/controllers/Agora/index');
const {sendNotification} = require('./src/controllers/Notifications/index');
const {ACCESS_TOKEN, NOTIFICATION} = require('./src/Api/apiEndPoints');

app.get(ACCESS_TOKEN, nocache, generateAccessToken);

app.post(NOTIFICATION, sendNotification);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
