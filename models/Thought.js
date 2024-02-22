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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
     },
    reactions: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reaction' }]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

thoughtSchema.virtual("reactionCount").get(() => {
    return this.reaction.length;
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
});

const Thought = mongoose.model("Thought", thoughtSchema);
const Reaction = mongoose.model("Reaction", reactionSchema);
module.exports = Thought;