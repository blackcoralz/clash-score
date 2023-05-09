const firebase = require("../src/db/firebaseConfig");

const getCLASHSCORE = (callback) => {
    firebase.ref(`clash-score`).once(
        'value',
        (snapshot) => {
            callback(snapshot.val());
        },
        (err) => {
            console.log('Read failed: ' , err.name);
        }
    );
};

module.exports = {getCLASHSCORE};