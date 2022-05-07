
const mongoose = require("mongoose");

// TODO: CONNECT TO MONGODB

mongoose.connect(process.env.DATABASE,{useUnifiedTopology: true});

// CHECK IF CONNECTION IS SUCCESSFULL

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// TODO:  DEFIN THE SCHEMAR FOR APP QUIZ COLLECTION

const UserSchemar = new mongoose.Schema({
    first_name:{type:String, require:true},
    last_name:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true}
})

// TODO:   CREAT MODEL FOR USER SCHEMAR

const UserModel = mongoose.model("users", UserSchemar)

// TODO:   EXPORT MODULE 

module.exports.UserModel = UserModel;