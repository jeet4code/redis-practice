const mongoose = require('mongoose');

try {
    mongoose.connect('mongodb://localhost/users_tests', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} catch (error) {
    console.log(error);
}

beforeEach(async () => {
    await mongoose.connection.collections.users.drop();
});