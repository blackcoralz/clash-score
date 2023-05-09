const firebase = require("../src/db/firebaseConfig");

const getSCHEDULE = (callback) => {
    firebase.ref(`schedule`).once(
        'value',
        (snapshot) => {
            callback(snapshot.val());
        },
        (err) => {
            console.log('Read failed: ' , err.name);
        }
    );
};

module.exports = {getSCHEDULE};