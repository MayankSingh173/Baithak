const express = require('express');
const {RtcTokenBuilder, RtcRole} = require('agora-access-token');

const PORT = 8080;

const APP_ID = '214682f487d14dfbbb8ff290b96d9c6e';
const APP_CERTIFICATE = 'f688d9e0b8de46c39a19248b87f401c0';

const app = express();

const nocache = (req, resp, next) => {
  resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  resp.header('Expires', '-1');
  resp.header('Pragma', 'no-cache');
  next();
};

const generateAccessToken = (req, resp) => {
  if (APP_ID && APP_CERTIFICATE) {
    // set response header
    resp.header('Acess-Control-Allow-Origin', '*');
    // get channel name
    const channelName = req.query.channelName;

    if (!channelName) {
      return resp.status(500).json({error: 'channel is required'});
    }
    // get uid
    let uid = req.query.uid;
    if (!uid || uid == '') {
      uid = 0;
    }
    // get role
    let role = RtcRole.SUBSCRIBER;
    if (req.query.role == 'publisher') {
      role = RtcRole.PUBLISHER;
    }
    // get the expire time
    let expireTime = req.query.expireTime;
    if (!expireTime || expireTime == '') {
      expireTime = 3600;
    } else {
      expireTime = parseInt(expireTime, 10);
    }
    // calculate privilege expire time
    const currentTime = Math.floor(Date.now() / 1000);
    const privilegeExpireTime = currentTime + expireTime;

    // build the token
    const token = RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      APP_CERTIFICATE,
      channelName,
      uid,
      role,
      privilegeExpireTime,
    );

    if (!token) {
      return resp.status(500).json({error: 'Token Not Generated'});
    }

    // return the token
    return resp.json({token: token});
  } else {
    return resp
      .status(500)
      .json({error: 'APP_ID or APP_Certificate is invalid'});
  }
};

app.get('/access_token', nocache, generateAccessToken);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
