const { User, Thought } = require('../models');
const Reaction = require("../models/Reaction");

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .populate('reactions');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: thought.reactions } });
            res.json({ message: 'Thought and reactions deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },







    // Create a reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .populate('reactions');
                
                if (!thought) {
                    return res.status(404).json({ message: 'No thought with that ID' });
                }
                
                thought.reactions.push(req.body);
                // const react = await Reaction.create(req.body);
                const reaction = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $set: thought },
                    { new: true });

                

            res.json(react);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate('reaction');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            thought.reactions.splice(thought.reactions[thought.reactions.indexOf(req.params.thoughtId)], 1);

                const reaction = await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { $set: thought },
                    { new: true });
            res.json(reaction);
            //res.json({ message: 'thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    }
};