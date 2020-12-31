const assert = require("assert");
const User = require("../src/models/user");

describe("Reading records", () => {
    let jeet
    beforeEach(async () => {
        jeet = new User({ 
            username: "Jeet",
            email: "Jeet@email.com",
            password: "12345678" 
        });
        await jeet.save();
    });

    it("find users by name", async () => {
        const users = await User.find({username: "Jeet"});
        assert(users.length === 1);
    })

    
})  