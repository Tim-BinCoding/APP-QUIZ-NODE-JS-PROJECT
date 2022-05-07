
// TODO: get URL api

const URL = "http://localhost:80"

//TODO: selecting all required elements

let displayDomscreen = document.getElementById("dopDisplayOnscreen");
let dom_CreateQuestion = document.querySelector(".contentInput");
let multipleAnswers = document.querySelector(".multipleAnswer");
let answerOption = document.querySelector(".optionAnswers");
let booleanAnswer = document.querySelector(".truefalseAnswer");
let typeAnswers = document.getElementById("choseTypeAnswers");
let btnAddmultipleorOption = document.querySelector(".addoption")
let btn_Requestpostdata = document.querySelector(".btn_PostData")
let parameterButtonUpdateOrAdd="SAVE ANSWER"
let displayDialogForm = document.querySelector(".displayDialog")
let inputAnswerTag=""
const DOMBODY=document.body
let paraIdOfquestionToupdate = 0;
let idOfquiz = 0

//TODO: show and hide
 
function hide(element){
    element.style.display="none"
}

function show(element){
    element.style.display="block"
}
// user login

function userHaslogined() {
    let userInfor = JSON.parse(localStorage.getItem("USER_LOGIN"));
    for(user of userInfor){
      if(user.username!=""){
        document.querySelector(".userLogin").textContent = user.username
      }
    }
  }
userHaslogined()
  


function updateData(update){
    // TODO: Request to the server to update one task as completed
    let body = {question:update.question, isCorrect:update.isCorrect, answers:update.answers, score:update.score}
    axios.put(URL + "/questions/update/" + paraIdOfquestionToupdate,body)
    .catch((error)=>{console.log(error)})
    requestData()
}

 // TODO: Request to the server to detele one task

function deleteData(question){
    axios.delete(URL + "/questions/delete/" + question)
    .catch((error)=>{console.log(error)})
    requestData()
}

 // TODO: request question from server and add DOM

function addData(add){
    let id = JSON.parse(localStorage.getItem("EDIT_ID"+ JSON.parse(localStorage.getItem("USER_ID"))))
    let body = {quizId:id, question:add.question, isCorrect:add.isCorrect, answers:add.answers, score:add.score}
    axios.post(URL + "/questions/add", body)
    .then((result)=>{console.log(result)})
    .catch((error)=>{console.log("My post is error at", error)})
    requestData()
}

function UpdateQuizTitle(title){
    console.log("update title quiz is", title);
    let id = JSON.parse(localStorage.getItem("EDIT_ID"+ JSON.parse(localStorage.getItem("USER_ID"))))
    let body = {title: title}
    axios.put(URL + "/quizses/update/" + id,body)
    .catch((error)=>{console.log(error)})
}

 // TODO: request from from server and update DOM

function requestData(){
    let id = JSON.parse(localStorage.getItem("EDIT_ID"+ JSON.parse(localStorage.getItem("USER_ID"))))
    axios.get(URL +"/questions/question/"+id)
    .then((result)=>{refreshDOM(result.data); console.log("my data in", result.data);})
    .catch((error)=>{console.log("You are error at", error)})
}

requestData()

//////////////// show list question ////////////////////////
function refreshDOM(displayData){
    console.log("My data is: ", displayData);
    parameterButtonUpdateOrAdd="SAVE ANSWER"
    displayData = displayData.reverse()
    while (displayDomscreen.firstChild) {displayDomscreen.removeChild(displayDomscreen.lastChild)}
    displayData.forEach(element => {
        if(element.quizId.title.length>2){
            (document.querySelector(".titleQuiz").style.display="flex"); 
            document.querySelector(".addQuizTitle").style.display="none"
            document.querySelector(".btnPractice").style.display="block"
        }
        document.getElementById("getTitle").value = element.quizId.title
        document.getElementById("subjectQuiz").textContent = element.quizId.title
        const questionAndAnswersDom=document.createElement("div")
        questionAndAnswersDom.className = "setListAdd"
        const questionDOM = document.createElement("div")
       questionDOM.className = "li-getquestion"
       questionDOM.id = element._id
        const span = document.createElement("span")
        span.className = "getValue"
        if(element.score!=null){defualtScore = element.score}else{false}
        span.textContent = "( "+ defualtScore +"pt ) "+ element.question
       questionDOM.appendChild(span)
        let btn=document.createElement("button")
        btn.className = "btnInQuest"
       questionDOM.appendChild(btn)
        const imgEdit=document.createElement("img")
        imgEdit.src="../../img/edit.png"
        imgEdit.className="editor"
       
        btn.appendChild(imgEdit)
        let imgDelete=document.createElement("img")
        imgDelete.src="../../img/delete-icon.png"
        imgDelete.className="deleter"
        btn.appendChild(imgDelete)
        

        const answersDom = document.createElement("div")
        answersDom.className = "answers_list";
        let answers = element.answers
        let correctANswers = element.isCorrect
        for (num = 0; num < answers.length; num++){
            let divOption = document.createElement("div")
            let spanAnswer = document.createElement("span");
            divOption.appendChild(spanAnswer)
            spanAnswer.textContent = answers[num]
            divOption.className = "option"
            correctANswers.forEach(element => {if(answers[num]== element){divOption.className = "option correct"}})
            answersDom.appendChild(divOption)
        }

        let dom_onHideAndShow=document.createElement("div");
        dom_onHideAndShow.className = "clickDesplay";
        let btnClick = document.createElement("i")
        btnClick.className = "fas fa-chevron-circle-up"
        dom_onHideAndShow.appendChild(btnClick)
        ///appendquestion to dom
        questionAndAnswersDom.appendChild(questionDOM)
        questionAndAnswersDom.appendChild(answersDom)
        questionAndAnswersDom.appendChild(dom_onHideAndShow)
        // append question and answer to display on screen
        displayDomscreen.appendChild(questionAndAnswersDom)
    });
}


// TODO: even function 

function displayCorrectAnswerIdDOM(option){
    for (item of option.children){
        let iconTage = document.createElement("div")
        let icon = document.createElement("i")
        if(item.className=="option correct"){
            iconTage.className ="icon tick"
            icon.className = "fas fa-check"
            iconTage.appendChild(icon)
            
        }else{
            item.className="option incorrect"
            // iconTage.className ="icon cross"
            // icon.className = "fas fa-times"
        }
        if(!item.children[1]){
            iconTage.appendChild(icon)
            item.appendChild(iconTage)
        }
    }
}


// update question in dom
function getRequesToUpdateDataInDom(questionIdToupdate){
    // TODO: request data from server
    axios.get("/questions/get")
    .then((result)=>{
        let questionToupdate = result.data
        questionToupdate.forEach(element => {if(questionIdToupdate == element._id){showDomToUpdateData(element)}});
    })
}

// show DOM to update

function showDomToUpdateData(dataToupdate){
    document.getElementById("getScore").value = dataToupdate.score
    document.getElementById("QuestionId").value = dataToupdate.question
    removeOldElement()
    paraIdOfquestionToupdate = dataToupdate._id
    let typeOfAnswers = dataToupdate.answers
    let typeOfcorrect = dataToupdate.isCorrect
    if(typeOfcorrect.length>1){
        for (let index = 0; index < typeOfAnswers.length; index++) {
            const element = typeOfAnswers[index]
            let goodAnswer = ""
            for(correct of typeOfcorrect){if (element == correct){goodAnswer = 'checked="checked"'}}
                inputMultipleAnswerTag = '<div class="set-input"> <input type="text" placeholder="Type answer" value="'+ element +'" id="answer" required><button class="removeAnswer">remove</button> <input type="checkbox" name="check" id="correctAnswerId" '+ goodAnswer+ ' required> </div>' 
                multipleAnswers.insertAdjacentHTML("beforeend", inputMultipleAnswerTag)  
        }
        show(multipleAnswers) 
        document.getElementById("choseTypeAnswers").value ="Checkbox"
    }else{
        
        inputOptionAnswerTag=""
        for (let index = 0; index < typeOfAnswers.length; index++) {
            const element = typeOfAnswers[index]
            let goodAnswer = ""
            if(element == typeOfcorrect[0]){
                goodAnswer = 'checked="checked"'
            }
            inputOptionAnswerTag = '<label for="check"></label> <div class="set-input"> <input type="text" placeholder="Type answer" id="answer" value="'+element+'" required><button class="removeAnswer">remove</button> <input type="radio" name="check" id="correctAnswerId" '+ goodAnswer+' required> </div>'
            answerOption.insertAdjacentHTML("beforeend", inputOptionAnswerTag)
        }
        show(answerOption)
        document.getElementById("choseTypeAnswers").value ="Multiple"
    }
    document.querySelector(".displayDialog").style.display="flex"
}

function removeOldElement(){
    while (answerOption.firstChild) {answerOption.removeChild(answerOption.lastChild)}
    while (multipleAnswers.firstChild) {multipleAnswers.removeChild(multipleAnswers.lastChild)}
}

// get question and answer from user create
function getDataFromDOM(typeInput){
    let data = {}
    let getAnswers=[]
    let isCorrectAnswer=[]
    let isAllInput=true;
    let isInputCheck=false;
    let quizTitle= document.getElementById("getTitle").value
    UpdateQuizTitle(quizTitle)
    let userSetScore = document.getElementById("getScore").value
    let questionInput = document.getElementById("QuestionId").value
    let dom_Answers = typeInput.querySelectorAll("#answer");
    let dom_CorrectAnswers = typeInput.querySelectorAll("#correctAnswerId");
    for(index = 0; index<dom_Answers.length; index++){
        if(dom_Answers[index].value ==""){
            isAllInput=false
        }
        getAnswers.push(dom_Answers[index].value)
        if(dom_CorrectAnswers[index].checked){
            isCorrectAnswer.push(dom_Answers[index].value)
            isInputCheck=true
        }
    }if(userSetScore==""){userSetScore="1"}
    //// check post
    if(questionInput !="" && isAllInput==true && isInputCheck==true){
        swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Question has completed',
            showConfirmButton: false,
            timer: 3000
        }) 
        data.question = questionInput
        data.isCorrect = isCorrectAnswer
        data.answers = getAnswers
        data.score = parseInt(userSetScore)
        if(getAnswers.length > 0 && isCorrectAnswer.length > 0 && btn_Requestpostdata.value == "SAVE ANSWER"){
            addData(data)
        }if(parameterButtonUpdateOrAdd == "UPDATE"){
            updateData(data)  
        }
        clearFormInput(typeInput)
        hide(displayDialogForm)
    }else{
        swal.fire({
            icon: 'error',
            title: 'Cannot Add',
            text: 'Check all input must be complete',
            timer: 5000
        })
    }
}

// clear user in put

function clearFormInput(typeInput){
    document.getElementById("getScore").value=""
    document.getElementById("QuestionId").value=""
    typeInput.querySelectorAll("#correctAnswerId").forEach(element => {
        element.checked=false
    });
    btn_Requestpostdata.value="SAVE ANSWER"
}

/////////////// chose type answers ////////////////////

function displayTypeanswers(type){
    if(type =="Checkbox"){
        show(multipleAnswers)
        show(btnAddmultipleorOption)
        hide(answerOption)
       }else if(type == "Multiple"){
        show(answerOption)
        show(btnAddmultipleorOption)
        hide(multipleAnswers)
       }else{
        hide(multipleAnswers)
        hide(btnAddmultipleorOption)
        hide(answerOption)
    }
}

function addInputanswers(typeOfadd){
    if(typeOfadd.children[0].value=="Checkbox"){
        inputAnswerTag = ""
        inputAnswerTag = '<div class="set-input"> <input type="text" placeholder="Type answer" id="answer" name="answer1" required><button class="removeAnswer">remove</button> <input type="checkbox" name="check" id="correctAnswerId" required> </div>'
        multipleAnswers.insertAdjacentHTML("beforeend", inputAnswerTag)
    }else if(typeOfadd.children[0].value=="Multiple"){
        inputAnswerTag=""
        inputAnswerTag = '<label for="check"></label> <div class="set-input"> <input type="text" placeholder="Type answer" id="answer" name="answer1" required><button class="removeAnswer">remove</button> <input type="radio" name="check" id="correctAnswerId" required> </div>'
        answerOption.insertAdjacentHTML("beforeend", inputAnswerTag)
    }
}

function postTypeofQuestion(typeOfAnswers){
    if(typeOfAnswers.children[0].value=="Checkbox"){
        getDataFromDOM(typeOfAnswers.children[1])
    }else if(typeOfAnswers.children[0].value=="Multiple"){
        getDataFromDOM(typeOfAnswers.children[2])
    }else{
        swal.fire({
            icon: 'error',
            title: 'Cannot save',
            text: 'Please check your answer and question',
            timer: 5000
        })
    }
}


// TODO: event button

DOMBODY.addEventListener("click", (e)=>{
    if(e.target.className == "fas fa-chevron-circle-down"){
        hide(e.target.parentElement.parentElement.children[1])
        e.target.className = "fas fa-chevron-circle-up"
    }else if(e.target.className == "fas fa-chevron-circle-up"){
        show(e.target.parentElement.parentElement.children[1])
        displayCorrectAnswerIdDOM(e.target.parentElement.parentElement.children[1])
        e.target.className ="fas fa-chevron-circle-down"
    }if(e.target.id == "choseTypeAnswers"){
        displayTypeanswers(e.target.value) /// when click one select type of answer
    }if(e.target.className == "addoption"){
        addInputanswers(e.target.parentElement.parentElement)
        
    }if(e.target.className == "removeAnswer"){
        e.target.parentElement.remove()
    }if(e.target.id == "btn_displayDailog"){
        if(document.querySelector("#getTitle").value!=""){
            displayDialogForm.style.display="flex"
            removeOldElement()
        }else{
            swal.fire({
                icon: 'error',
                title: 'Cannot add your question',
                text: 'Please complete your title',
                timer: 5000
            })
        }
        document.querySelector("#choseTypeAnswers").value="No_Typeanswers"
    }if(e.target.className == "btn_PostData"){
        postTypeofQuestion(e.target.parentElement.parentElement)
    }if(e.target.className=="deleter"){
        let questionToRemove = e.target.parentElement.parentElement.id
        deleteData(questionToRemove)
    }if(e.target.className == "editor"){
        let questionIdToupdate = e.target.parentElement.parentElement.id
        getRequesToUpdateDataInDom(questionIdToupdate)
        btn_Requestpostdata.value="UPDATE"
        parameterButtonUpdateOrAdd="UPDATE"
    }if(e.target.id=="spanIconHide"){
        hide(displayDialogForm)
        removeOldElement()
    }if(e.target.textContent == "Practice"){
        let id = JSON.parse(localStorage.getItem("EDIT_ID"+ JSON.parse(localStorage.getItem("USER_ID"))))
        localStorage.setItem("QUIZ_ID"+JSON.parse(localStorage.getItem("USER_ID")), JSON.stringify(id))
        console.log(e.target);
      }

})
