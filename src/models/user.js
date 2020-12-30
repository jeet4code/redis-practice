const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    id: Number,
    username: String,
    email: String,
    password: String,
});

userSchema.pre("save", async function(next) {
    try {
        if(this.isNew) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        next();
    } catch(error) {
        next(error);
    }
});

userSchema.methods.verifyPassword = async function (password) {
    // don't use arrow function while using current instance(this).
    return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;