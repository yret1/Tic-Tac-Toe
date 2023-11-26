const gameLogic = (() => {

    let p1, p2

    function gameStuff () {
        let playerOne = document.getElementById("p_one").value;
        let playerOneMarker = "X";
        let playerTwo = document.getElementById("p_two").value;
        let playerTwoMarker = "O";  

        p1 = createPlayer(playerOne, playerOneMarker)
        p2 = createPlayer(playerTwo, playerTwoMarker)

        let playerDisplay = document.getElementById("currentPlayer");

        playerDisplay.innerText = `It's ${p1.name}'s Turn!`


    }


    function createPlayer (name, marker) {

        return {name, marker}
    }

    return {
        gameStuff,
        getP1: () => p1,
        getP2: () => p2
    };


})();




const gameBoard = (() => {


    let box1 = document.getElementById("box1")
    let box2 = document.getElementById("box2")
    let box3 = document.getElementById("box3")
    let box4 = document.getElementById("box4")
    let box5 = document.getElementById("box5")
    let box6 = document.getElementById("box6")
    let box7 = document.getElementById("box7")
    let box8 = document.getElementById("box8")
    let box9 = document.getElementById("box9")

    let gameboard = [
        box1,
        box2,
        box3,
        box4,
        box5,
        box6,
        box7,
        box8,
        box9
    ]

    function winCheck() {
        if (
            (box1.innerHTML !== "" && box1.innerHTML === box2.innerHTML && box1.innerHTML === box3.innerHTML) ||
            (box4.innerHTML !== "" && box4.innerHTML === box5.innerHTML && box4.innerHTML === box6.innerHTML) ||
            (box7.innerHTML !== "" && box7.innerHTML === box8.innerHTML && box7.innerHTML === box9.innerHTML) ||
            (box1.innerHTML !== "" && box1.innerHTML === box4.innerHTML && box1.innerHTML === box7.innerHTML) ||
            (box2.innerHTML !== "" && box2.innerHTML === box5.innerHTML && box2.innerHTML === box8.innerHTML) ||
            (box3.innerHTML !== "" && box3.innerHTML === box6.innerHTML && box3.innerHTML === box9.innerHTML) ||
            (box1.innerHTML !== "" && box1.innerHTML === box5.innerHTML && box1.innerHTML === box9.innerHTML) ||
            (box3.innerHTML !== "" && box3.innerHTML === box5.innerHTML && box3.innerHTML === box7.innerHTML)
        ) {
            findWinningMarker();
            endGame();
        }
    }

    let winBox = document.getElementById("winner")

    function findWinningMarker() {


        let winP1 = gameLogic.getP1()
        let winp2 = gameLogic.getP2()

        const winningCombinations = [
            [box1, box2, box3],
            [box4, box5, box6],
            [box7, box8, box9],
            [box1, box4, box7],
            [box2, box5, box8],
            [box3, box6, box9],
            [box1, box5, box9],
            [box3, box5, box7],
        ];
    
        for (const combination of winningCombinations) {
            const markers = combination.map(box => box.innerHTML);
            if (markers.every(marker => marker === "X")) {
                winBox.innerText = `${winP1.name} Is The Winner!!`

            } else if (markers.every(marker => marker === "O")) {
                winBox.innerText = `${winp2.name} Is The Winner!!`
            }
        }
    }

    let playerDisplay = document.getElementById("currentPlayer");
    let activePlayer;

    function gameClicks () {

        gameboard.forEach(box => {
        box.addEventListener("click", handleClick)
    });
    }



    function endGame () {

        gameboard.forEach(box => {
            box.removeEventListener("click", handleClick)
        })
    }
    


    function handleClick () {
        if(this.innerHTML === "" && activePlayer){

            this.innerHTML = activePlayer.marker;


            activePlayer = (activePlayer === gameLogic.getP1()) ? gameLogic.getP2() : gameLogic.getP1();


            playerDisplay.innerText = `It's ${activePlayer.name}'s Turn!`
        };

        winCheck()
    };

    
    let resetBtn = document.getElementById("resetBtn");

    resetBtn.addEventListener("click", reset)

    function reset () {
        gameboard.forEach(playedBox => {
            playedBox.innerHTML = ""
        })

        activePlayer = gameLogic.getP1();
        winBox.innerText = "";
        playerDisplay = "";
        gameClicks()

        
    }

    return {
        setActivePlayer: player => {activePlayer = player;},
        gameClicks
    }



})();


document.getElementById("startBtn").addEventListener("click",() => {
    gameLogic.gameStuff();
    gameBoard.gameClicks();
    gameBoard.setActivePlayer(gameLogic.getP1());
})