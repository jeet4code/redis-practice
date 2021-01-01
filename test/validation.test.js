const assert = require("assert");
const User = require("../src/models/user");

describe("Validation:", () => {
    it("username requires", () => {
        const jeet = new User({ 
            email: "Jeet@email.com",
            password: "12345678" 
        });
        const validationResult = jeet.validateSync();
        const {message} = validationResult.errors.username;

        assert(message == "Username is required");
    });

    it("username should have atleast 3 characters", () => {
        const jeet = new User({ 
            username: "aa",
            email: "Jeet@email.com",
            password: "12345678" 
        });
        const validationResult = jeet.validateSync();
        const {message} = validationResult.errors.username;

        assert(message == "Username too short");
    });
});