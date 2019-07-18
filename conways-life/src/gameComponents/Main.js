import React, { Component } from 'react';
import Grid from './Grid'
import './game.css'


 
class Main extends Component {
    constructor(){
        super();
        this.speed = 100;
        this.rows = 30;
        this.columns = 50;
        this.state = {
            generations: 0,
            grid: Array(this.rows).fill().map(() => Array(this.columns).fill(false)),
            intervalId: 0
        }
    }
    componentDidMount(){
        this.seed();
        
    }
    selectBox = (row,col) => {
        let gridCopy = arrayClone(this.state.grid);
        gridCopy[row][col] = !gridCopy[row][col]
        this.setState({
            grid: gridCopy 
        })
    }

    seed = () => {
        let gridCopy = arrayClone(this.state.grid);
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                if(Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true;
                }
            }
        }
        this.setState({
            grid: gridCopy
        });
    }
     
    gameStart = () => {
        clearInterval(this.state.intervalId)
        this.setState({
            intervalId: setInterval(this.play, this.speed)
        })
        
    }
    pause = () => {
        clearInterval(this.state.intervalId);
    }
    clear = () => {
        clearInterval(this.state.intervalId)
        let gridCopy = arrayClone(this.state.grid);
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                gridCopy[i][j] = false;
            }
        }
    }

    play = () => {
        let g = this.state.grid;
        let g2 = arrayClone(this.state.grid);
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.columns; j++) {
                let count = 0;
                if (i > 0) if (g[i - 1][j]){ count++;}
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) {count++};
                if (i > 0 && j < this.columns - 1) if (g[i - 1][j + 1]) {count++;}
                if (j < this.columns - 1) if (g[i][j + 1]) {count++;}
                if (j > 0) if (g[i][j - 1]) {count++;}
                if (i < this.rows - 1) if (g[i + 1][j]) {count++;}
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) {count++;}
                if (i < this.rows - 1 && this.columns - 1) if (g[i + 1][j + 1]) {count++;}
                if (g[i][j] && (count < 2 || count > 3)) {g2[i][j] = false;}
                if (!g[i][j] && count === 3) {g2[i][j] = true;}
            }
        }
        this.setState({
            grid: g2,
            generations: this.state.generations + 1
        })
    }

    

    render() {
        return (
            <div>
                <h1>Game Of Life</h1>
                <Grid 
                    grid = {this.state.grid}
                    rows = {this.rows}
                    columns = {this.columns}
                    selectBox ={this.selectBox}
                />
                <h2>Generations: {this.state.generations}</h2>
                <div className="buttons">
                <button onClick = {this.gameStart}>Start</button>
                <button onClick = {this.pause}>Pause</button>
                <button onClick = {this.clear}>Clear</button>
                <button onClick={this.seed}>Seed</button>
                </div>
            </div>
        )
    }
}
function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}
export default Main;