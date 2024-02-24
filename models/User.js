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
            validator: (eml) => { return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(eml); }
        },
        message: "Incorrect format for email address",
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });


userSchema.virtual("friendCount").get(() => {
    //return await userSchema.aggregate([{$project:{friends:{$size:"$friends"}}}]);
    return (this.friends) ? this.friends.length : 0;
});


const User = mongoose.model("User", userSchema);

module.exports = User;