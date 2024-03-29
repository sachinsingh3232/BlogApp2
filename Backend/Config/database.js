const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect(process.env.MONGODB_URL).then((res) => {
        console.log("Database connected");
    }).catch((e) => {
        console.log("Database not connected");
    })
}
module.exports = connectDB;