
// TODO: identify requirement 

// main button get name form html
let firstName = document.querySelector("#firstname");
let lastName = document.querySelector("#lastname");
let emailAddress = document.querySelector("#email");
let pass = document.querySelector("#signinpassword");

let DomOfQuizses = document.querySelector(".card-group")
let btnUser = document.querySelector("#btnsignin");
btnUser.addEventListener("click", signUp)
//----------------function sign up-------------------------
function signUp(e) {
  e.preventDefault();
  let firstname = firstName.value;
  let lastname = lastName.value;
  let useremail = emailAddress.value;
  let userpassword = pass.value;
  // request the server to create new user
  let URL = "http://localhost/users/create"
  let body = {first_name:firstname, last_name:lastname, email:useremail, password:userpassword};
  console.log('my sign up id', body);
  axios.post(URL, body).then((response)=> {
    if(response) {
        document.querySelector(".Correct").style.display = "block";
        setTimeout(function(){
          window.location.reload(1);
      },2000);
    }
  }).catch((error)=> {
    console.log(error)
  })
}


//----------------- function login------------------------
function login(){
  let useremail = uemail.value;
  let userpassword = upassword.value;
  let url = "http://localhost/users/login";
  let body = {email:useremail, password:userpassword};
  axios.post(url, body).then((response)=>{
      if(response.data){
          document.querySelector(".correct").style.display = "block";
          setTimeout(function(){
            getInforOfUser(userpassword)
            document.querySelector(".contianerFormLogin").style.display = "none";
            document.querySelector(".contianerApp").style.display = "block";
            window.location.reload();
        }, 2000);
      }else{
          document.querySelector(".incorrect").style.display = "block";
          setTimeout(function(){
            window.location.reload();
         },2000);
      }
  })   
}


// check if user login already

function userHaslogined() {
  if(JSON.parse(localStorage.getItem("USER_LOGIN"))){
    let userInfor=JSON.parse(localStorage.getItem("USER_LOGIN"))
    for(user of userInfor){
      if(user.username!=""){
        document.querySelector(".userLogin").textContent = user.username
        document.querySelector(".contianerApp").style.display = "block";
        document.querySelector(".contianerFormLogin").style.display="none"
      }
    }

  }else{
    document.querySelector(".contianerApp").style.display = "none";
    document.querySelector(".contianerFormLogin").style.display="block"
  }
}
userHaslogined()


// main button get name from html 
let uemail = document.querySelector("#loginemail");
let upassword = document.querySelector("#loginpasword");

// //-----------------------function add questions-----------------------


// adduser.addEventListener("click", addData);

//------------------verirable display login and sign up---------------
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
signupBtn.onclick = (()=>{
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
    
});
loginBtn.onclick = (()=>{
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});

//----------------------functin show form login------------------------ 
function showform() {
  document.querySelector(".contianerApp").style.display = "none";
  document.querySelector(".correct").style.display = "none";
  setTimeout(function(){
    window.location.reload(1);
  },1000); 
}
// manin button


//------------------function show index many quizses--------------------
function showquizses() {
  document.querySelector(".contianerApp").style.display = "none";
  document.querySelector(".cotaninercards").style.display = "block";
}
// main button 
let btnquiz = document.querySelector(".btnplay");
btnquiz.addEventListener("click", showquizses);

//---------------------function click back-------------------------------
// var input = document.querySelector('.pswrd');
// var show = document.querySelector('.fa-eye');
// show.addEventListener('click', active);
// function active(){
//   if(input.type === "password"){
//     input.type = "text";
//     show.style.color = "#1DA1F2";
//   }else{
//     input.type = "password";
//     show.style.color = "#111";
//   }
// }

// function icons eye show password and hide
function showpswrd(){
  let inputType=document.querySelectorAll(".pswrd")
  for (let index = 0; index < inputType.length; index++) {
    const element = inputType[index];
    if(element.type === "password"){
      element.type = "text";
      document.querySelectorAll(".fa-eye")[index].style.display = "block";
      document.querySelectorAll(".fa-eye-slash")[index].style.display = "none";
    }else{
      element.type = "password";
      document.querySelectorAll(".fa-eye")[index].style.display = "none";
      document.querySelectorAll(".fa-eye-slash")[index].style.display = "block";
    }
  }
}
// button show
let input = document.querySelectorAll('.pswrd');
let shows = document.querySelectorAll('.fa-eye');
for (let show of shows) {
  show.addEventListener('click', showpswrd);
}
// button high
let higes = document.querySelectorAll(".fa-eye-slash");
for (let hige of higes) {
  hige.addEventListener("click", showpswrd);
}


///// view topic of quiz

function refreshDOMToViewTopic(quizses){
  while(DomOfQuizses.firstChild){DomOfQuizses.removeChild(DomOfQuizses.lastChild)}
  quizses.forEach(element => {
    if(element.title!="..."){
      let headBody = '<div class="card-body m-2"><div class="card-title mt-4"><h5>'+ element.title +'</h5></div>'
      let partBody = '<div class="btngroup" id="'+ element._id +'"> <a href="views/play/play.html" class="btn btn-primary mr-2">Play Quiz</a> <a href="views/edit/edit.html" class="btn btn-primary ml-2">Edit Quiz</a></div>'
      let footBody = "</div"
      DomOfQuizses.insertAdjacentHTML("beforeend", headBody+partBody+footBody)
    }
  });
}



// TODO: request datas
function getInforOfUser(userpassword){

  let url = "http://localhost:80/users/logined/";
  axios.get(url + userpassword).then((respone)=>{
    let userInfor = respone.data
    let inFormationuser = []
    for (user of userInfor){
      localStorage.setItem("USER_ID", JSON.stringify(user._id))
      inFormationuser.push({username:user.first_name + " "+ user.last_name, email:user.email})
    }
    localStorage.setItem("USER_LOGIN", JSON.stringify(inFormationuser))
  })
}


function requestQuizsesFromServer(){
  axios.get("quizses/quiz").then((result)=>{
    let datas = result.data
    refreshDOMToViewTopic(datas.reverse())

  }).catch((error)=>console.log(error))
}
requestQuizsesFromServer()

/// Dom of button
document.body.addEventListener("click", (e)=>{
  let URL = "http://localhost:80"
  if(e.target.textContent == "Play Quiz"){
    localStorage.setItem("QUIZ_ID"+JSON.parse(localStorage.getItem("USER_ID")), JSON.stringify(e.target.parentElement.id))
  }if(e.target.textContent == "Edit Quiz" && e.target.className=="btn btn-primary ml-2"){
    localStorage.setItem("EDIT_ID"+ JSON.parse(localStorage.getItem("USER_ID")), JSON.stringify(e.target.parentElement.id))
  }if(e.target.textContent == "Create Quiz"){
    let body={title:"...", userId:JSON.parse(localStorage.getItem("USER_ID"))}
    axios.post(URL + "/quizses/quiz", body)
    .then((result)=>{console.log(result)})
    .catch((error)=>{console.log("My post is error at", error)})
    userCreatQuiz()
    
  }else if(e.target.className =="fa fa-user-circle-o"){
    localStorage.removeItem("USER_LOGIN");
    userHaslogined()
    setTimeout(function(){
      window.location.reload(1);
    },1000); 
  }else if(e.target.id=="btnlogin"){
    login()
    userHaslogined()
  }else if(e.target.className=="setLogin"){
    showform()
    userHaslogined()
  }
})

function userCreatQuiz(){
  let url = "http://localhost:80/quizses/quiz/";
  let title ="..."
  axios.get(url + title).then((respone)=>{
    localStorage.setItem("EDIT_ID"+ JSON.parse(localStorage.getItem("USER_ID")), JSON.stringify(respone.data[0]._id))
  })
}
