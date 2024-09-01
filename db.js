const mongoose = require('mongoose');

const URI = 'mongodb://0.0.0.0:27017/foodie';
mongoose.connect(URI);
const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to MongoDB")
})
db.on('error',(err)=>{
    console.log('Database Connection Error:',err);
})
db.on('disconnect',()=>{
    console.log("Disconnected from MongoDB")
})