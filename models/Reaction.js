const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Schema.Types.ObjectId
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
    reactionBody: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
},
{
  toJSON: {
    getters: true,
  },
  id: false,
});

module.exports = reactionSchema;