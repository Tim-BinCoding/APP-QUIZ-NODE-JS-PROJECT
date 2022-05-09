
const express = require('express');
const router = express.Router();

const exportModel = require('../models/submit_model')

// get correction by id quiz
router.get('/', (req, res)=>{
    exportModel.sumbitModel.find()
    .populate('questionId')
    .then((result)=>{ console.log(result); res.send(result)})
})

// summit one quiz
router.post('/add', (req, res) => {
    let isAddquestion = exportModel.sumbitModel.create(req.body)
    if (isAddquestion) {
        res.status(201).send({
            "message": 'Submitation successfully'
        })
    } else {
        res.status(500).send({
            "message": 'All field required'
        })
    }
})

module.exports = router;
