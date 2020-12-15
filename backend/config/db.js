const mongoose = require('mongoose');
// const config = require('config');
const dotenv = require('dotenv');
dotenv.config();
// const db = config.get('MongoURI');
// const db = process.env.MongoURI;
const db =
  'mongodb+srv://admin:TonypasswOrd35147@mangadb.vbmiu.mongodb.net/todolist?retryWrites=true&w=majority';
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Mongo connected...');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
