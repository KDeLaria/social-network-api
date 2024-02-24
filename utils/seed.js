const connection = require('../config/connection');
const { User, Thought } = require('../models');
const userData = require('./userData.json');
//const thoughtData = require('./thoughtData.json');

connection.on("error", (err) => {
  console.log(err.message);
});


connection.once("open", async () => {

  try {
    // let thoughtCheck = await connection.db.listCollections({ name: 'Thought' }).toArray();
    // if (thoughtCheck.length) {
    //   await connection.dropCollection('Thought');
    // }

    let userCheck = await connection.db.listCollections({ name: 'User' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('user');
    }




    // await Thought.collection.insertMany(thoughtData);
    // console.log(thoughtData);
    await User.collection.insertMany(userData);
    console.log(userData);
    process.exit(0);
  }
  catch (err) {
    console.log(err.message);
  }
});