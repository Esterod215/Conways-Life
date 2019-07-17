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
            grid: Array(this.rows).fill().map(() => Array(this.columns).fill(false))
        }
    }
    selectBox = (row,col) => {
        let gridCopy = arrayClone(this.state.grid);
        gridCopy[row][col] = !gridCopy[row][col]
        this.setState({
            grid: gridCopy 
        })
    }

    // seed = () => {
    //     let gridCopy = arrayClone(this.state.grid);
    //     for(let i = 0; i < this.rows;) {
    //         for(let j = 0; j < this.columns; j++) {
    //             if(Math.floor(Math.random() * 4 === 1)) {
    //                 gridCopy[i][j] = true;
    //             }
    //         }
    //     }
    //     this.setState({
    //         grid:gridCopy
    //     });
    // }
    // componentDidMount() {
    //     this.seed();
    // }

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
            </div>
        )
    }
}
function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}
export default Main;