const express = require('express')
const cors = require("cors")
const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 3000
app.use(express.urlencoded({ extended : true }))
app.use(express.json())

app.use(cors({origin:"*"})); // To allow any origin

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT)
})

// Define static
app.use(express.static("public"));

// Router

const questionRouter = require('./routes/question_router')

const userRouter = require("./routes/user_router")

const quizRouter = require("./routes/quiz_router")

const submitRouter = require("./routes/submit_router")


app.use('/questions', questionRouter)

app.use("/users", userRouter)

app.use("/quizses", quizRouter)

app.use("/submit", submitRouter)



