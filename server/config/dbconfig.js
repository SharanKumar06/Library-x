const mongoose= require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.mongo_url)

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('MongoDB database connection established successfully!');
});

mongoose.connection.on('error', (err) => {  
    console.log('Mongoose default connection error: ' + err);
  });

module.exports = mongoose;