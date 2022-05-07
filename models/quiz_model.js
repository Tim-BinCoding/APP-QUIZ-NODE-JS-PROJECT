
const mongoose = require("mongoose");

// TODO: CONNECT TO MONGODB

mongoose.connect(process.env.DATABASE,{useUnifiedTopology: true});

// CHECK IF CONNECTION IS SUCCESSFULL

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("QuizSchemar Connected successfully");
});

// TODO:  DEFIN THE SCHEMAR FOR APP QUIZ COLLECTION

const QuizSchemar = new mongoose.Schema({
    title:{type:String, require:true},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "users"},
}) 

// CREAT MODEL FOR APP QUIZ COLLECTION FROM SCHEMAR 

const QuizModel = mongoose.model("quizses", QuizSchemar);

// EXPORT MODEL

module.exports.QuizModel = QuizModel;



