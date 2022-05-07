
const URL = "http://localhost:80"

function requestFromServer(){
    let id = JSON.parse(localStorage.getItem("QUIZ_ID"+JSON.parse(localStorage.getItem("USER_ID"))))
    axios.get(URL + "/questions/question/"+id).then((respone)=>{
        let questions = respone.data
        localStorage.setItem("YOUR_QUIZ", JSON.stringify(questions))
    })
}
let questions = JSON.parse(localStorage.getItem("YOUR_QUIZ"));
requestFromServer()

///user login
function userHaslogined() {
    let userInfor = JSON.parse(localStorage.getItem("USER_LOGIN"));
    for(user of userInfor){
      if(user.username!=""){
        document.querySelector(".userLogin").textContent = user.username
      }
    }
  }
userHaslogined()

//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const answersDOM = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const typeAnswers = document.querySelector(".typeOfAnswer")
const DOMBUTTON_BODY = document.body

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
    requestFromServer()
    userHaslogined()
    questions = JSON.parse(localStorage.getItem("YOUR_QUIZ"));
   questions.forEach(element => {
       document.querySelector(".title").textContent=element.quizId.title
   }); 
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let totalScore=0;
let counter;
let counterLine;
let widthValue = 0;
let clickAnswers = 0

const restart_quiz = result_box.querySelector(".buttons .restart");
// const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    totalScore=0;
    score = 0
    userScore = 0;
    widthValue = 0;
    clickAnswers=0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++;
        que_numb++; 
        showQuetions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show");
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}

function showQuetions(index){
    const questionDOM = document.querySelector(".que_text");
    if(questions[index].isCorrect.length == 1){
        typeAnswers.innerHTML = "There is "+ questions[index].isCorrect.length + " answer correct !!!"
    }else{typeAnswers.innerHTML = "There are "+ questions[index].isCorrect.length + " answers correct !!!"}

    let dom_Question = '<span>'+ que_numb + ". " + questions[index].question + " (" + questions[index].score + 'pt )</span>';
    let numOfAnswers = questions[index].answers
    let option_tag = ""
    for(A=0; A < numOfAnswers.length; A++){
        option_tag += '<div class="option"><span>'+ questions[index].answers[A] +'</span></div>'
    }
    
    questionDOM.innerHTML = dom_Question;
    answersDOM.innerHTML = option_tag;
    
    const option = answersDOM.querySelectorAll(".option");
    totalScore += questions[index].score
    score = questions[index].score

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
/// when user click on answers
function optionSelected(answer){
    clickAnswers ++
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].isCorrect;
    const allOptions = answersDOM.children.length;
    let outOfCorrect = 0;
    for(correctanswer of correcAns){
        outOfCorrect++
        if(userAns == correctanswer){
            answer.classList.add("correct");
            answer.insertAdjacentHTML("beforeend", tickIconTag);
        }else if(outOfCorrect == correcAns.length && !answer.children[1]){
            score -= questions[que_count].score/correcAns.length;
            answer.classList.add("incorrect"); 
            answer.insertAdjacentHTML("beforeend", crossIconTag);
            for(i=0; i < allOptions; i++){
                if(answersDOM.children[i].textContent == correcAns){ 
                    answersDOM.children[i].setAttribute("class", "option correct"); 
                    answersDOM.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                }
            }
           
        }
    }
    
    if(clickAnswers == correcAns.length){
        clearInterval(counter);
        clearInterval(counterLine);
        userScore += parseInt(score) 
        for(i=0; i < allOptions; i++){
            answersDOM.children[i].classList.add("disabled");
            clickAnswers = 0
        }
        next_btn.classList.add("show");
    } 
}

function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > totalScore-totalScore/4){
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ totalScore +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > totalScore-totalScore/2){
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ totalScore +'</p></span>';
        scoreText.innerHTML = scoreTag; 
    }
    else{
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ totalScore +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){ 
            clearInterval(counter);
            timeText.textContent = "Time Off"; 
            const allOptions = answersDOM.children.length; 
            let correcAns = questions[que_count].isCorrect;
            for(i=0; i < allOptions; i++){
                for(correctanswer of correcAns){
                    if(answersDOM.children[i].textContent == correctanswer && !answersDOM.children[i].children[1]){ 
                        answersDOM.children[i].setAttribute("class", "option correct"); 
                        answersDOM.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                        console.log("Time Off: Auto selected correct answer.");
                    }
                }
                if(!answersDOM.children[i].children[1]){
                    answersDOM.children[i].classList.add("incorrect");
                    answersDOM.children[i].insertAdjacentHTML("beforeend", crossIconTag);
                    console.log("Wrong Answer");
                }else{false}
                answersDOM.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}


function startTimerLine(time){
    let widthOfdomline = quiz_box.clientWidth-1
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; 
        time_line.style.width = time + "px"; 
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}

