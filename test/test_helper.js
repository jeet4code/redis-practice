const { before } = require('mocha');
const mongoose = require('mongoose');

before(async () => {
    try {
        await mongoose.connect('mongodb://localhost/users_tests', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error);
    }

    beforeEach(async () => {
        try {
            mongoose.connection.collections.users.drop();
        } catch (error) {
            console.log("Errorrr")
        }
        
    });
});

