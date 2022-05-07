
const mongoose = require("mongoose");

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
    quizId:{type: mongoose.Schema.Types.ObjectId, ref:"quizses"},
    quizzes:{
        question:{type:String, require:true},
        answers:[{type:String, require:true}],
        correctAnswers:[{type:String, require:true}],
        incorrectAnswers:[{type:String, require:true}],
        eachScore:{type:Number, require:true},
    },
    totalScore:{type:Number, require:true}
}) 

// CREAT MODEL FOR APP QUIZ COLLECTION FROM SCHEMAR 

const sumbitModel = mongoose.model("submitation", submitSchema);

// EXPORT MODEL

module.exports.sumbitModel = sumbitModel;




