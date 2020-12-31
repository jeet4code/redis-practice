const assert = require("assert");
const User = require("../src/models/user");

describe("Creating records", () => {
    it("saves a user", async () => {
        const jeet = new User({ 
            username: "Jeet",
            email: "Jeet@email.com",
            password: "12345678" 
        });
        await jeet.save();
        assert(!jeet.isNew);
    });
});