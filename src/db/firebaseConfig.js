const admin = require('firebase-admin');

const serviceAccount = require('./clash-aibo-firebase-adminsdk-mtl5i-236f2c6697.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://clash-aibo-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();

module.exports = db;