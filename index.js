import { questions } from "./question.js";
// console.log(questions);


let start = document.querySelector("#btn")
let showQues = document.querySelector("#question")
// let allOption = document.querySelector("#allOption")

let userClick = []
let correctAns = [];
let pushQues = []
let optionSelected ;


let x = 5
let Interval;
let timer;

start.addEventListener("click", openQuestionBox)

function openQuestionBox() {
   start.style.display = "none"
   showQues.style.display = "block"

   createQuestion()


   Interval = setInterval(() => {
      if (x < 1) {
       if(!optionSelected){
          userClick.push(null)
         }
         x = 5
       createQuestion()
      }
      else {
         x--
      }
      timer.innerHTML = x

   }, 1000);
}


function displayAns() {
   let count = 0;
   for (let i = 0; i < correctAns.length; i++) {
      if (correctAns[i] === userClick[i]) {
         count++
      }
   }

   return `your answered ${count} / ${questions.length} questions correctly`

}




function getRandomquestion() {
   return Math.floor(Math.random() * questions.length)
}

function checkrandom() {
   let randomQues = questions[getRandomquestion()]

   if (pushQues.includes(randomQues)) return checkrandom()
   else {
      pushQues.push(randomQues)
      correctAns.push(randomQues.a)
      return randomQues
   }
}


function createQuestion() {
   if (pushQues.length === questions.length) {
      showQues.innerHTML = ""
      clearInterval(Interval)
      let result = document.createElement("h2")
      result.innerHTML = displayAns()
      return showQues.append(result)

   }

   showQues.innerHTML = ""

   let quesAns = checkrandom()
    optionSelected = false

   let ques = document.createElement("h2");
   ques.innerHTML = quesAns.q
   timer = document.createElement("p")
   timer.innerHTML = x

   showQues.append(ques, timer)



   let options = quesAns.opt
   let buttoncontainer = document.createElement("div")
   options.forEach((option) => {
      let btns = document.createElement("button")
      btns.innerHTML = option
      buttoncontainer.append(btns)
   })
   showQues.append(buttoncontainer)
      buttoncontainer.addEventListener("click", function (e) {
     if(e.target.tagName==="BUTTON"){
        buttoncontainer.querySelectorAll("button").forEach(btn => btn.disabled = "true");
        e.target.disabled = false
        userClick.push(e.target.innerHTML)
        optionSelected = true;

      }
      // console.log(userClick)
          
   })


}













