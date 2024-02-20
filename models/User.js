const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (eml) => { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eml); }
        },
        message: "Incorrect format for email address"
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thought',
    }],
    friends: [{ type: userSchema }]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

userSchema.virtuals("friendCount").get(() => {
    return this.friends.length;
});

const User = mongoose.model("User", userSchema);
module.exports = User;