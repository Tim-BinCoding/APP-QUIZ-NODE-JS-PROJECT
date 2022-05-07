
const express = require('express');
const router = express.Router();

const exportModel = require('../models/question_model')
// items route

router.get('/get', (req, res) => {
    exportModel.QuestionModel.find()
    .then((result)=>{
        console.log(result) ;
        res.send(result)})
})

// get question by id quiz
router.get("/question/:id", (req, res)=>{
    exportModel.QuestionModel.find({quizId: req.params.id})
    .populate("quizId")
    .then((result)=>{ console.log(result); res.send(result)})
})


// create one quiz question

router.post('/add', (req, res) => {
    let isAddquestion = exportModel.QuestionModel.create(req.body)
    if (isAddquestion) {
        res.status(201).send({
            "message": 'Question added successfully'
        })
    } else {
        res.status(500).send({
            "message": 'All field required'
        })
    }
})

// delete one quiz question
router.delete('/delete/:id', (req, res) => {
    exportModel.QuestionModel.deleteOne({ _id: req.params.id })
    .then((result) => {
        res.send("Question delete successfully");
    })
    .catch((error) => {
        res.send(error)
    })
})

// update one quiz question
router.put('/update/:id', (req, res) => {
    exportModel.QuestionModel.updateMany({_id : req.params.id}, req.body)
    .then((result)=> {
        res.send("Question update successfully")

    })
    .catch((error)=> {
        res.send(error)
    })
})
module.exports = router;
