

const express = require('express');
const router = express.Router();

const exportModel = require('../models/quiz_model');

// user router
router.get('/quiz', (req, res) => {
    exportModel.QuizModel.find()
    .populate("userId")
    .then((result)=>{
        console.log("result ", result) ;
        res.send(result)})
})

// for edite
router.get("/quiz/:title", (req, res)=>{
    exportModel.QuizModel.find({title: req.params.title})
    .then((result)=>{ console.log(result); res.send(result)})
})


router.post('/quiz', (req, res) => {
    exportModel.QuizModel.create(req.body)
    .then((result)=>{
        if(result){res.status(201).send({"message": 'Quiz is post succed'})}
        else{res.status(500).send({"message": 'All field required'})}
    })

})

// create 

router.put('/update/:id', (req, res) => {
    exportModel.QuizModel.updateMany({_id:req.params.id}, req.body)
    .then((result)=> {
        res.send("Question update successfully")
    })
    .catch((error)=> {
        res.send(error)
    })
})

// TODO: export router

module.exports = router