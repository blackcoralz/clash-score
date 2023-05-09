const firebase = require("../src/db/firebaseConfig");

const getCLASHDETAIL = (callback) => {
    firebase.ref(`clash-details`).once(
        'value',
        (snapshot) => {
            callback(snapshot.val());
        },
        (err) => {
            console.log('Read failed: ' , err.name);
        }
    );
};

module.exports = {getCLASHDETAIL};