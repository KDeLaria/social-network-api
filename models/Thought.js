const mongoose = require("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        minlength: 1,
        maxlength: 280,
        required: true
    },
    createdAt: {
        type: Date,
        default:Date.now
    },
    username:{ 
        type: String,
        ref: 'User',
        required: true
     },
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
     },
    reactions: [Reaction]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

thoughtSchema.virtual("reactionCount").get(() => {
    return (this.reactions)? this.reactions.length : 0;
});

const Thought = mongoose.model("Thought", thoughtSchema);
module.exports = Thought;