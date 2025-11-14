const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    address: String,
    role: { type: String, default: "resident" }
});

module.exports = mongoose.model("user", UserSchema);