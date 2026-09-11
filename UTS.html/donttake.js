
let players = [] 
let turn=0 
let bones=16 
let time=5 
let timer 
let gameOver=false;

function show(id){
    document.querySelectorAll('.page').
        forEach(p=>p.classList.remove('active')); 
    document.getElementById(id).classList.add('active')
}

function renderList(){
    document.getElementById("list").
        innerHTML=players.map(p=>`<li>${p}</li>`).join('')
}
function addPlayer(){
    let n = document.getElementById("playerName").value;

    if (n) {
        let playerExist = false
        for (let i=0; i<players.length; ++i) {
            if (players[i] == n) {
                playerExist = true
                break
            }
        }

        if (playerExist === false) {
            players.push(n); 
            document.getElementById("playerName").value = ""; 
            renderList();
            updatePlayerText();
        } else {
            alert("player is the same")
        }
    }
}
function startGame(){
    if (players.length<2) return alert("Minimal 2 player");
    const param = players.join(",")
    window.location.href = "donttake.html?player=" + param
}

function makeBoard(){
    const b=document.getElementById("board"); 
    b.innerHTML=""; 
    bones=16;
    for(let i=0;1<25;i++){
        let d=document.createElement("div");
        if (i>5 && i<19 && i%5>0 && i%5<4) {
            d.className="center"; 
            if (i==12) d.innerText="💤";
        }
        else{
            d.className="bone"; 
            d.innerText="🦴";
            d.onclick=()=>take(d);
        }
        b.appendChild(d)
    }
    document.getElementById("boardEnd").innerHTML=b.innerHTML;
    document.getElementById("turn").innerText=players[turn];
}
     
function take(el){
    if (gameOver||el.classList.contains('taken'))return;
    el.classList.add('taken');
    // SFX Zoom
    // new Audio('pop.mp3').play();
    bones--;
    if (bones<=0){endGame()}
    else{turn=(turn+1)%players.length; 
        document.getElementById("turn").innerText=players[turn]; 
        resetTimer()
    }
}

function resetTimer(){
    clearInterval(timer); time=5; updateTime();
    time=setInterval(()=>{time--; updateTime(); 
        if(time<0){
            turn=(turn+1)%players.length; 
            document.getElementById("turn").innerText=players[turn]; 
            resetTimer()
        }}, 1000
    )
}
function updateTime(){document.getElementById("timer").innerText='00:0${time}'}

function endGame(){
    gameOver=true; clearInterval(timer);
    // SFX Gonggong
    // new Audio('back.mp3').play();
    document.getElementById("loser").innerText=players[turn];
    show('gameOver');
}

// function playAgain(){gameOver=false; startGame()}
function backHome(){gameOver=false; show('home')}

renderList();

function updatePlayerText() {
    $("#player-text").text("Player " + (players.length+1));
}
updatePlayerText();
