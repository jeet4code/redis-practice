const assert = require("assert");
const User = require("../src/models/user");

describe("Updating records", () => {
    let jeet
    beforeEach(async () => {
        jeet = new User({ 
            username: "Jeet",
            email: "Jeet@email.com",
            password: "12345678" 
        });
        await jeet.save();
    });

    it("update user", async () => {
        jeet.set('email', "jeet@google.com"); // set and save
        //OR jeet.update({'email': "jeet@google.com"}) // no need to save
        const updates = await jeet.save();
        assert(updates.email == "jeet@google.com");
    });

    it("update user Using Model", async () => {
        let updates = await User.updateOne({'username': "Jeet"}, {'email': "jeet@google.com"})
        assert(updates.nModified == 1);
    });
})  