const mongoose = require("mongoose");

const connectDb = async ()=>{
    try {
        const connection = await mongoose.connect("mongodb+srv://pntkumavat:AS2gY9VvCCmKJJqs@cluster0.vhbyeil.mongodb.net/sangam");
        console.log("Database is connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDb;