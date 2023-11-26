const gameLogic = (() => {

    let p1, p2

    function gameStuff () {
        let playerOne = document.getElementById("p_one").value;
        let playerOneMarker = "X";
        let playerTwo = document.getElementById("p_two").value;
        let playerTwoMarker = "O";  

        p1 = createPlayer(playerOne, playerOneMarker)
        p2 = createPlayer(playerTwo, playerTwoMarker)
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


    let gameboard = [
        document.getElementById("box1"),
        document.getElementById("box2"),
        document.getElementById("box3"),
        document.getElementById("box4"),
        document.getElementById("box5"),
        document.getElementById("box6"),
        document.getElementById("box7"),
        document.getElementById("box8"),
        document.getElementById("box9")
    ]


    let playerDisplay = document.getElementById("currentPlayer");
    let activePlayer;

    gameboard.forEach(box => {
        box.addEventListener("click", handleClick)
    });

    


    function handleClick () {
        if(this.innerHTML === "" && activePlayer){

            this.innerHTML = activePlayer.marker;


            activePlayer = (activePlayer === gameLogic.getP1()) ? gameLogic.getP2() : gameLogic.getP1();


            playerDisplay.innerText = `It's ${activePlayer.name}'s Turn!`
        };
    };

    
    let resetBtn = document.getElementById("resetBtn");

    resetBtn.addEventListener("click", reset)

    function reset () {
        gameboard.forEach(playedBox => {
            playedBox.innerHTML = ""
        })

        activePlayer = undefined
    }

    return {
        setActivePlayer: player => {activePlayer = player;}
    }



})();


document.getElementById("startBtn").addEventListener("click",() => {
    gameLogic.gameStuff();
    gameBoard.setActivePlayer(gameLogic.getP1());
})