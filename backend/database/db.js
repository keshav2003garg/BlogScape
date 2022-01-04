const mongoose = require('mongoose');

const connectToMongo = () => {
    try {
        mongoose.connect(process.env.mongoURI, () => {
            console.log("Connected to MongoDB Successfully");
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToMongo;