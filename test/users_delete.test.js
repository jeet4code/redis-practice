const assert = require("assert");
const User = require("../src/models/user");

describe("Deleting records", () => {
    let jeet
    beforeEach(async () => {
        jeet = new User({ 
            username: "Jeet",
            email: "Jeet@email.com",
            password: "12345678" 
        });
        await jeet.save();
    });

    it("delete users by name", async () => {
        // User.remove
        const deleted = await User.deleteOne({username: "Jeet"});
        
        assert(deleted.deletedCount == 1);
    })

    
})  