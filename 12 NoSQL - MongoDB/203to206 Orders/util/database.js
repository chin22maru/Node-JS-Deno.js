const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI);

let _db;

const connectDB = async () => {
    try {
        await client.connect();
        console.log("MongoDB connected successfully");

        // Print MongoClient object
        _db = client.db("shop");
        // console.log("MongoClient Object:", client);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

const getDb = () => {
    if(_db) return _db;
    throw 'No DB Found!'
}

exports.connectDB = connectDB;
exports.getDb = getDb;
