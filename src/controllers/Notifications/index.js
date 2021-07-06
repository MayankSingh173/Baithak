const admin = require('firebase-admin');

const sendNotification = async (req, res) => {
  try {
    const payload = req.body;
    const message = {
      notification: {
        title: payload.title,
        body: payload.body,
        imageUrl: payload.imageUrl,
      },
      tokens: payload.tokens,
      android: {
        notification: {
          color: '#45F1DE',
        },
      },
    };

    await admin.messaging().sendMulticast(message);

    res.json({message: 'Send'});
  } catch (error) {
    return res.status(500).json({error: error});
  }
};

module.exports = {
  sendNotification,
};
