
const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

// TODO: CONNECT TO MONGODB

mongoose.connect(process.env.DATABASE,{useUnifiedTopology: true});

// CHECK IF CONNECTION IS SUCCESSFULL

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("submitSchema Connected successfully");
});

// TODO:  DEFIN THE SCHEMAR FOR APP QUIZ COLLECTION

const submitSchema = new mongoose.Schema({
    questionId:[{type: mongoose.Schema.Types.ObjectId, ref:"questions", require:true}],
    userAnswer:[[{type:String, require:true}]],
    totalScore:{type:Number, require:true}
}) 


// CREAT MODEL FOR APP QUIZ COLLECTION FROM SCHEMAR 

const sumbitModel = mongoose.model("submitations", submitSchema);

// EXPORT MODEL

module.exports.sumbitModel = sumbitModel;




