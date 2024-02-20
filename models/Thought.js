const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        minlength: 1,
        maxlength: 280,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default:Date.now
    },
    username:{ 
        type: userSchema,
        required: true
     },
    friends: [{ type: reactionSchema }]
});

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Schema.Types.ObjectId
    },
    reactionBody: {
        type: String,
        minlength: 1,
        maxlength: 280,
        username:{ 
            type: userSchema,
            required: true
        },
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
});

const User = mongoose.model("Thought", thoughtSchema);
module.exports = User;