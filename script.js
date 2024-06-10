console.log("Welcome to Tictactoe")
let music = new Audio("music.mp3")
let turnO = new Audio("O-sound.mp3")
let turnX = new Audio("X-sound.mp3")
let gameover = new Audio("newgame.mp3")
let turn = "X"
let isgameover = false;


    music.loop = true;
    music.play();

//function to change the turn
const changeTurn = ()=> {
    return turn=== "X"? "0":"X"
}

//function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
        (boxtext[e[1]].innerText === boxtext[e[2]].innerText) && 
        (boxtext[e[0]].innerText !== ""))
            {
                document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
                isgameover = true;
                gameover.play();
                document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px"
                document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
                document.querySelector(".line").style.width = "20vw";
            }
    })

}



document.getElementById("playButton").addEventListener('click', () => {
    music.loop = true;
    music.play();
});

document.getElementById("stopButton").addEventListener('click', () => {
    music.pause();
    music.currentTime = 0; // Reset the music to the beginning
});

// Function to check for a draw
const checkDraw = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let allFilled = Array.from(boxtext).every(element => element.innerText !== "");
    if (allFilled && !isgameover) {
        document.querySelector('.info').innerText = "It's a Draw!";
        isgameover = true;
    }
}

// Game Logic

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            if (turn === "X")
                turnX.play();
            else 
                turnO.play();
            checkWin();
            turn = changeTurn();
            if(!isgameover)
                {
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        }
        checkDraw();
    }
    })
})

// add onclick listener to reset button
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    })
    turn = "X";
    isgameover = false
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
    music.loop = true;
    music.play();
})
