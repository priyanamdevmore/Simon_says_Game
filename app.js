let gameSeg=[];
let userSeq=[];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function levelUp(){
    level++;
    h2.innerHTML = `Level ${level}`;
    let ranIdx = Math.floor(Math.random() * 3);
    let randColor = btns[ranIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    console.log(ranIdx);
    console.log(randColor);
  btnFlash(randBtn);
}

// function btnPress{
//     console.log("btn was pressed");
// }