import './App.css';
import React from 'react';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'black'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

class Square extends React.Component {
  render() {
    return (
      <div
        onClick={this.props.action}
        className="square"
        style={squareStyle}>
        {this.props.val}
      </div>
    );
  }
}

class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.state.board = [
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ];   
    this.state.player = "X";
    this.state.winner = null;
  }

  reset() {
    let state = {};

    state.board = [
      [null,null,null],
      [null,null,null],
      [null,null,null]
    ];

    state.player = "X";
    state.winner = null;

    this.setState(state);

  }

  checkWinner() {
    var i, j;

    // Check lines
    for(i = 0; i < 3; i++){
       let result_line = {"X": 0, "O": 0};
       for(j = 0; j < 3; j++){
         if(this.state.board[i][j] != null){
           result_line[this.state.board[i][j]]++;
         }
         if(j === 2){
           if(result_line["X"] === 3){
             return "X";
           }
           if(result_line["O"] === 3){
             return "O";
           }
         }
      }
    }

    // Check Columns
    for(i = 0; i < 3; i++){
       let result_column = {"X": 0, "O": 0};
       for(j = 0; j < 3; j++){
         if(this.state.board[j][i] != null){
           result_column[this.state.board[j][i]]++;
         }
         if(j === 2){
           if(result_column["X"] === 3){
             return "X";
           }
           if(result_column["O"] === 3){
             return "O";
           }
         }
      }
    }

    // Check Left top to Right Bottom
    let b1 = this.state.board;
    if(b1[0][0] === b1[1][1] && b1[1][1] === b1[2][2]){
      return b1[0][0];
    }

    // Check Righ top to Left Bottom
    let b2 = this.state.board;
    if(b2[0][2] === b2[1][1] && b2[1][1] === b2[2][0]){
      return b2[0][2];
    }

    return false;
  }


  fillSquare(x,y) {
    const state = this.state;

    // Stop game execution once we have a winner
    if(state.winner != null){
      alert("The winner is " + state.winner);
      return;
    }

    let player = state.player;

    if(state.board[x][y] != null){
      return;
    }

    state.board[x][y] = player;

    console.log("Fill: x=" + x + " - y="+ y);

    let result = this.checkWinner();

    if(result !== false ){
      state.winner = result;
    }

    this.setState({
        winner: state.winner,
        board: state.board, 
        player: player === "X" ? "O" : "X"
      });

  }

  render() {
    return (
      <div style={containerStyle} className="gameBoard">
        <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{this.state.player}</span></div>
        <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{this.state.winner === null ? 'None' : this.state.winner}</span></div>
        <button style={buttonStyle} onClick={this.reset.bind(this)}>Reset</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square val={this.state.board[0][0]} action={() => {this.fillSquare(0,0)}}/>
            <Square val={this.state.board[0][1]} action={() => {this.fillSquare(0,1)}}/>
            <Square val={this.state.board[0][2]} action={() => {this.fillSquare(0,2)}}/>
          </div>
          <div className="board-row" style={rowStyle}>
            <Square val={this.state.board[1][0]} action={() => {this.fillSquare(1,0)}}/>
            <Square val={this.state.board[1][1]} action={() => {this.fillSquare(1,1)}}/>
            <Square val={this.state.board[1][2]} action={() => {this.fillSquare(1,2)}}/>
          </div>
          <div className="board-row" style={rowStyle}>
            <Square val={this.state.board[2][0]} action={() => {this.fillSquare(2,0)}}/>
            <Square val={this.state.board[2][1]} action={() => {this.fillSquare(2,1)}}/>
            <Square val={this.state.board[2][2]} action={() => {this.fillSquare(2,2)}}/>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}


export default App;
