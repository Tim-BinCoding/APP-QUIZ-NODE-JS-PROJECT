
const mongoose = require("mongoose");

// TODO: CONNECT TO MONGODB

mongoose.connect(process.env.DATABASE,{useUnifiedTopology: true});

// CHECK IF CONNECTION IS SUCCESSFULL

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("QuestionSchemar Connected successfully");
});

const QuestionSchemar = new mongoose.Schema({
  quizId:{type: mongoose.Schema.Types.ObjectId, ref:"quizses"},
  question:{type:String, require:true},
  isCorrect:[{type:String,require:true}],
  answers:[{type:String, require:true}],
  score:{type:Number, require:true}
})

// CREAT MODEL FOR APP QUIZ COLLECTION FROM SCHEMAR 

const QuestionModel = mongoose.model("questions", QuestionSchemar)

// EXPORT MODEL

module.exports.QuestionModel = QuestionModel;



