const { before } = require('mocha');
const mongoose = require('mongoose');

before(() => {
    try {
        mongoose.connect('mongodb://localhost/users_tests', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (error) {
        console.log(error);
    }
});


beforeEach(async () => {
    await mongoose.connection.collections.users.drop();
});