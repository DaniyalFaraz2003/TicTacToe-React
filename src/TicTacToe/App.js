import React, { useState, useEffect } from "react";
import buttonsArray from './buttonData'
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

var callCount = 0;
var anotherCallCount = 0;
var firstTurnOf;

class Player {
    constructor(hasTurn, mark) {
        this.hasTurn = hasTurn;
        this.mark = mark;
    }
    getMark() {
        return this.mark;
    }
    setHasTurn(value) {
        this.hasTurn = value;
    }
}

class ExpertComputer extends Player {
    constructor(hasTurn, mark) {
        super(hasTurn, mark);
    }

    getActions = (state) => {
        let actions = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (state[i][j] === "") {
                    actions.push([i, j])
                }
            }
        }
        return actions;
    }

    applyAction(state, action, mark) {
        let newState = state.map((row) => row.map((value) => value));
        newState[action[0]][action[1]] = mark;
        return newState;
    }

    nextMove(firstTurnOf, state) {
        let countX = 0;
        let countO = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (state[i][j] == "X")
                    countX += 1
                if (state[i][j] == "O")
                    countO += 1
            }
        }
        if (firstTurnOf === "O") {
            if (countX < countO)
                return "X"
            else
                return "O";
        }
        else {
            if (countO < countX)
                return "O";
            else
                return "X";
        }
    }

    MinMax(firstTurnOf, state) {
        if (state.isTerminal())
            return state.value();

        if (this.nextMove(firstTurnOf, state.board) === "X") {
            let value = -Infinity;
            let actions = this.getActions(state.board, "X");
            for (const action of actions) {
                let result = this.applyAction(state.board, action, "X");
                let copy = new Board(); // Create a new copy of the board
                copy.board = result.map(row => [...row]); // Assign the result to the new copy
                value = Math.max(value, this.MinMax(firstTurnOf, copy));
            }
            return value;
        }

        if (this.nextMove(firstTurnOf, state.board) === "O") {
            let value = Infinity
            let actions = this.getActions(state.board, "O");
            for (const action of actions) {
                let result = this.applyAction(state.board, action, "O");
                let copy = new Board(); // Create a new copy of the board
                copy.board = result.map(row => [...row]); // Assign the result to the new copy
                value = Math.min(value, this.MinMax(firstTurnOf, copy));
            }
            return value;
        }
    }

    GetNextBestMove(firstTurnOf, state) {
        let bestMove;
        let maxValue = Infinity;
        let actions = this.getActions(state.board, this.mark);
        for (const move of actions) { //may change
            let copy = new Board();
            copy.board = state.copyBoard();
            let result = this.applyAction(copy.board, move, this.mark);
            copy.board = result.map(row => row.map(value => value));
            let currentValue = this.MinMax(firstTurnOf, copy);
            if (currentValue < maxValue) {
                    maxValue = currentValue;
                    bestMove = move;
            }
        } //may change
        this.hasTurn = false;
        return bestMove;
    }
}

class DumbComputer extends Player {
    constructor(hasTurn, mark) {
        super(hasTurn, mark);
    }

    makeMove(board) {
        let moves = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === "") moves.push([i, j]);
            }
        }
        if (moves.length === 0) return;
        let randomMove = moves[Math.floor(Math.random() * moves.length)];
        board[randomMove[0]][randomMove[1]] = this.mark;
        this.hasTurn = false;
    }
}

class Board {
    constructor() {
        this.board = [["", "", ""], ["", "", ""], ["", "", ""]];
    }

    value() {
        if (this.checkWin("X")) return 1;
        if (this.checkWin("O")) return -1;
        return 0;
    }

    updateBoard(buttonState) {
        for (let i = 0; i < buttonState.length; i++) {
            let row = Math.floor(i / 3);
            this.board[row][i % 3] = buttonState[i].mark;
        }
    }

    checkWin(mark) {
        const directions = [
            [0, 1],   // Horizontal
            [1, 0],   // Vertical
            [1, 1],   // Diagonal (top-left to bottom-right)
            [-1, 1]   // Diagonal (bottom-left to top-right)
        ];

        const numRows = this.board.length;
        const numCols = this.board[0].length;

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                if (this.board[row][col] === mark) {
                    for (const [dr, dc] of directions) {
                        let count = 0;

                        for (let i = 0; i < 3; i++) {
                            const newRow = row + i * dr;
                            const newCol = col + i * dc;

                            if (
                                newRow < 0 || newRow >= numRows ||
                                newCol < 0 || newCol >= numCols ||
                                this.board[newRow][newCol] !== mark
                            ) {
                                break;
                            }

                            count++;

                            if (count === 3) {
                                return true;
                            }
                        }
                    }
                }
            }
        }

        return false; // No winning line found
    }

    copyBoard() {
        return this.board.map(row => row.map((value) => value));
    }

    isTerminal() {
        if (this.checkWin("X") || this.checkWin("O")) return true;
        for (const row of this.board) {
            for (const mark of row) {
                if (mark === "") return false;
            }
        }
        return true;
    }
}

const GameModeSelector = ({ onSelectMode }) => {
    const [selectedMode, setSelectedMode] = useState('player');

    const handleModeChange = (value) => {
        let mode;
        switch (value) {
            case 0:
                mode = 'player';
                break;
            case 1:
                mode = 'dumbComputer';
                break;
            case 2:
                mode = 'expertComputer';
                break;
            default:
                mode = 'player';
        }
        setSelectedMode(mode);
        onSelectMode(mode);
    };

    return (
        <div className="game-mode-selector">
            <span>Select Game Mode:</span>
            <Slider
                min={0}
                max={2}
                defaultValue={0}
                marks={{ 0: 'P v P', 1: 'PC DUMB', 2: 'PC PRO' }}
                onChange={handleModeChange}
            />
        </div>
    );
};

function Header() {
    return (
        <header className="head bg-blue-500">
            <h1 className="text-blue-50 font-bold text-center text-2xl">(X) TIC-TAC-TOE (O)</h1>
        </header>
    );
}

const Tile = (props) => {
    return (
        <button onClick={() => props.changeState(props.id)} className="tile" key={props.id}>{props.mark}</button>
    );
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var board = new Board();
var player1 = new Player(true, "X");
var player2 = new Player(false, "O");
var dumbComputer = new DumbComputer(false, "O"); //this point may change
var expertComputer = new ExpertComputer(false, "O");
firstTurnOf = "X";

function App() {
    const [buttons, setButtons] = useState(buttonsArray);
    const [gameMode, setGameMode] = useState('player');
    const [dumbComputerTurn, setDumbComputerTurn] = useState(dumbComputer.hasTurn);
    const [expertComputerTurn, setExpertComputerTurn] = useState(expertComputer.hasTurn);

    board.updateBoard(buttons);

    const handleModeSelect = (mode) => {
        setGameMode(mode);
        resetState(mode);
    };

    const resetState = (mode) => {
        setButtons(prevState => prevState.map((value) => {
            return { ...value, mark: "" };
        }));
        if (mode === "player") {
            player1.hasTurn = [true, false][Math.floor(Math.random() * 2)];
            if (player1.hasTurn) player2.hasTurn = false;
            else player2.hasTurn = true;
        }
        else if (mode === "dumbComputer") {
            player1.hasTurn = [true, false][Math.floor(Math.random() * 2)];
            if (player1.hasTurn) { 
                dumbComputer.hasTurn = false; 
                if (dumbComputerTurn === true) setDumbComputerTurn(false); 
            }
            else { 
                dumbComputer.hasTurn = true; 
                if (dumbComputerTurn === false) setDumbComputerTurn(true); 
            }
        }
        else {
            player1.hasTurn = [true, false][Math.floor(Math.random() * 2)];
            if (player1.hasTurn) { 
                expertComputer.hasTurn = false; 
                if (expertComputerTurn === true) setExpertComputerTurn(false); 
                firstTurnOf = player1.mark; 
            } 
            else { 
                expertComputer.hasTurn = true; 
                if (expertComputerTurn === false) setExpertComputerTurn(true); 
                firstTurnOf = expertComputer.mark; 
            }
        }
    }

    const changeState = (id) => {
        if (!board.isTerminal()) {
            setButtons((prevState) => {
                return prevState.map((value) => {
                    let newObj = value;
                    if (newObj.id === id) {
                        if (player1.hasTurn && newObj.mark === "") {
                            newObj.mark = player1.mark;
                            player1.hasTurn = false;
                            if (gameMode === "player")
                                player2.hasTurn = true;
                            else if (gameMode === "dumbComputer") {
                                dumbComputer.hasTurn = true;
                                setDumbComputerTurn(true);
                            }
                            else if (gameMode === "expertComputer") {
                                expertComputer.hasTurn = true;
                                setExpertComputerTurn(true);
                            }
                        }
                        else if (player2.hasTurn && newObj.mark === "" && gameMode === "player") {
                            newObj.mark = player2.mark;
                            player1.hasTurn = !player1.hasTurn;
                            player2.hasTurn = !player2.hasTurn;
                        }

                    }

                    return newObj;
                });
            });
        }
    }

    function changeStateAccBoard() {
        setButtons((prevState) => {
            let newState = prevState;
            let count = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    newState[count].mark = board.board[i][j]
                    count++;
                }
            }
            return newState;
        })
    }

    // dumb computer
    async function handleDumbCompMove() {
        callCount++;
        if (callCount === 2) {
            callCount = 0; return;
        }
        if (gameMode === "dumbComputer") {
            if (dumbComputerTurn && !board.isTerminal()) {
                dumbComputer.makeMove(board.board);
                await sleep(1000);
                setDumbComputerTurn(false);
                player1.hasTurn = true;
            }
        }
    };
    handleDumbCompMove();
    useEffect(() => {
        changeStateAccBoard();
    }, [dumbComputerTurn])

    //expert computer
    async function handleExpertCompMove() {
        anotherCallCount++;
        if (anotherCallCount === 2) {
            anotherCallCount = 0; return;
        }
        if (gameMode === "expertComputer") {
            if (expertComputerTurn && !board.isTerminal()) {
                let bestMove = expertComputer.GetNextBestMove(firstTurnOf, board);
                let newBoard = expertComputer.applyAction(board.board, bestMove, expertComputer.mark);
                board.board = newBoard.map(row => row.map(value => value));
                await sleep(1000);
                setExpertComputerTurn(false);
                player1.hasTurn = true;
            }
        }
    };
    handleExpertCompMove();
    useEffect(() => {
            changeStateAccBoard();
    }, [expertComputerTurn]);

    const tileElements = buttons.map((value) => {
        return <Tile id={value.id} mark={value.mark} changeState={changeState} />
    })

    let endMessage;
    if (board.isTerminal()) {
        if (gameMode === "player") {
            if (board.checkWin(player1.mark)) endMessage = <h2>{player1.mark} WINS!!!</h2>
            else if (board.checkWin(player2.mark)) endMessage = <h2>{player2.mark} WINS!!!</h2>;
            else endMessage = <h2>DRAW!!!</h2>
        }
        else {
            if (board.checkWin(player1.mark)) endMessage = <h2>YOU WIN!!!</h2>
            else if (board.checkWin(dumbComputer.mark)) endMessage = <h2>COMPUTER WINS!!!</h2>;
            else endMessage = <h2>DRAW!!!</h2>
        }
    }

    let yourTurnMessage;
    if (!board.isTerminal()) {
        if (gameMode === "player") {
            if (player1.hasTurn) yourTurnMessage = <p className="turnMessage">{player1.mark}'s TURN</p>;
            else if (player2.hasTurn) yourTurnMessage = <p className="turnMessage">{player2.mark}'s TURN</p>;
        }
        else {
            if (player1.hasTurn) yourTurnMessage = <p className="turnMessage">YOUR TURN</p>;
            else yourTurnMessage = <p className="turnMessage">COMPUTER TURN</p>;
        }
    }
    else {
        yourTurnMessage = <p className="turnMessage">GAME END</p>;
    }

    return (
        <main>
            <Header />
            <GameModeSelector onSelectMode={handleModeSelect} />
            {yourTurnMessage}
            <div className="gamePoint">
                {tileElements}
            </div>
            <div className="results">
                {board.isTerminal() && endMessage}
                {board.isTerminal() && <button onClick={resetState}>RESTART</button>}
            </div>
        </main>
    );
}

export default App;