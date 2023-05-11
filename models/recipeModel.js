const firebase = require("../src/db/firebaseConfig");

const getRECIPE = (callback) => {
    firebase.ref(`recipe`).once(
        'value',
        (snapshot) => {
            callback(snapshot.val());
        },
        (err) => {
            console.log('Read failed: ' , err.name);
        }
    );
};

module.exports = {getRECIPE};