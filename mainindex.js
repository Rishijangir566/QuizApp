import { questions } from "./question.js";  

const timerdiv=document.querySelector("#timer")
const questiondiv=document.querySelector("#question")
const optionsdiv=document.querySelector("#options")
const startBtn=document.querySelector("#btn")
let questionAlreadyDisplay =[];
let randomQues;
let quesNumber=0;
let randomOpt;
let Interval;
let timer=5
let flag=0;
let userAnswer=[];
let correctAnswer=[];
let count=0;
let selectedAnswer;
let selecetdOption; 
let timeOut;
startBtn.addEventListener("click", startQuiz);


function startQuiz(){
    startBtn.style.display="none"
    timerdiv.style.display="block"
    displayQuestion()
    timerdiv.innerHTML=timer

Interval= setInterval(()=>{
   if(timer===1){
    if(quesNumber===questions.length){
        clearInterval(Interval)
        questiondiv.innerHTML=""
        optionsdiv.innerHTML=""
        timerdiv.style.display="none"
        questiondiv.innerHTML=calculateScore()
    }
     else{
        displayQuestion()
        timer=5;
        timerdiv.innerHTML=timer
        if(flag===0)userAnswer.push(null)
            else flag=0
     }
   }
   else{
    timerdiv.innerHTML= --timer

   }

},1000)
}

   function calculateScore(){
    for(let i=0; i<questions.length ; i++){
        if(userAnswer[i]===correctAnswer[i]){
            count++
        }
    }
    return `You Answer ${count} out of ${questions.length} Questions`
   }


 function displayQuestion(){
      const randomQues = getRandomquestion()
      questiondiv.innerHTML=questions[randomQues].q
      displayoption(questions[randomQues].opt)
        quesNumber++
        correctAnswer.push(questions[randomQues].a)
 }

 function displayoption(arr){
     optionsdiv.innerHTML=""
    arr.forEach(option => {
         let para = document.createElement("p")
         para.innerHTML=option
         para.addEventListener("click",storeuserAns)
         optionsdiv.append(para)
    });
 }

 function storeuserAns(e){
     selecetdOption=e.target;
     selectedAnswer=selecetdOption.innerHTML
     userAnswer.push(selectedAnswer)
     optionColorUpdate()
    flag=1
    TimeOut()
 }

  function optionColorUpdate(){
    if(selectedAnswer===correctAnswer[correctAnswer.length-1]){
        selecetdOption.style.backgroundColor="green"
    }
    else{
        selecetdOption.style.backgroundColor="red"
    }
  }


 function getRandomquestion (){
    const randomValue = Math.floor(Math.random()*questions.length)
    if (questionAlreadyDisplay.includes(randomValue))
        return getRandomquestion();
    else{
        questionAlreadyDisplay.push(randomValue)
        return randomValue
    }

 }
  function TimeOut(){
      timeOut= setTimeout(() => {
         timer=1
      },300);
  }