

// TODO: requirement
const URL = "http://localhost:80"
let quizTitleDOM = document.querySelector(".quiztitle_correct")
let scoreCorrectionDOM = document.querySelector(".score_correction")
let emailRecorderDOM = document.querySelector(".email_recoder")
let userNameSumitDOM = document.querySelector(".username_correction")
let cardCorrectionDOM = document.querySelector(".card_correction")
let windowDisplay = document.querySelector(".close_window")
// TODO: call back function 

function getData(){
    let quizId = JSON.parse(localStorage.getItem("QUIZ_ID"+JSON.parse(localStorage.getItem("USER_ID"))))
    let questions = JSON.parse(localStorage.getItem("SUMIT_ID:"+quizId))
    refreshDOM(questions)
}
getData()

function refreshDOM(questions){
    console.log("My data is", questions);
    let totalScore=0
    let scoreSubmit=0
    let numberqu=0
    while(cardCorrectionDOM.firstChild){cardCorrectionDOM.removeChild(cardCorrectionDOM.lastChild)}

    for (let index = 0; index < questions.length; index++) {
        numberqu++
        let element = questions[index]
        quizTitleDOM.textContent=element.title
        scoreSubmit += element.correctionScore
        totalScore += element.defaultScore
        scoreCorrectionDOM.textContent = scoreSubmit + "/" + totalScore
        let questionText = '<div class="que_text"> <span class="question_value">'+numberqu+". "+element.question+'</span><span class="score_Mark">'+element.correctionScore+ '/' +element.defaultScore + "</span></div>"
        cardCorrectionDOM.insertAdjacentHTML("beforeend", questionText);
        let answersText ='<div class="option_list">'
        let answers = element.answers
        for (let index = 0; index < answers.length; index++) {           
            answersText+='<div class="option"><span>'+answers[index]+'</span></div>'
        }
        answersText+="</div>"
        cardCorrectionDOM.insertAdjacentHTML("beforeend", answersText)
        let answersTextContent = cardCorrectionDOM.querySelectorAll(".option_list")[index]
        checkAnswers(answersTextContent, element.correctAnswers, element.userAnswers)
    }
}

function checkAnswers(allAnswers, answers, userAnswers){
    let tickIconTag = '<div class="icon tick"><i class="fa fa-check"></i></div>';
    let crossIconTag = '<div class="icon cross"><i class="fa fa-close"></i></div>';
    let isUserCorrect = false
    for (let index = 0; index < allAnswers.children.length; index++) {
        const element = allAnswers.children[index];
        let isUserIncorrect=false
        let isCorrectAns=false
        if(answers.length == userAnswers.length){
            for (let n = 0; n < userAnswers.length; n++) {
                for (answer of answers){
                    if(answer == userAnswers[n] && userAnswers[n] == element.textContent && isUserCorrect==false){isUserCorrect=true}
                }
               if(answers[n]!=userAnswers[n]&&userAnswers[n] == element.textContent && isUserCorrect==false){isUserIncorrect=true}
               else if(answers[n] != userAnswers[n] && answers[n] == element.textContent){isCorrectAns=true}
            }
        }else{
            for (let n = 0; n < answers.length; n++){if(answers[n] == element.textContent){isCorrectAns=true}}
        }
        if(isUserCorrect){
            element.setAttribute("class", "option correct");
            element.insertAdjacentHTML("beforeend", tickIconTag)
            isUserCorrect = false
        }if(isUserIncorrect){
            element.setAttribute("class", "option incorrect");
            element.insertAdjacentHTML("beforeend", crossIconTag)
        }if(isCorrectAns){
            element.setAttribute("class", "option correct");
            // element.insertAdjacentHTML("beforeend", tickIconTag)
        }
        
    }
    
}
