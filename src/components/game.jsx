import React, {Component}   from 'react'
var WebFont = require('webfontloader');
import Select from 'react-select'
import '../scss/react-select.scss';

import GameBoard            from './containers/game-board.jsx'

export default class MindGame extends Component {

    constructor(props) {
        super(props);
        WebFont.load({
            google: {families: ['Open Sans']}
        })
    }

    state = {
        difficulty: '',
        tiles: 8
    }

    render() {
        let option = {label: this.state.difficulty, value: this.state.tiles}
        return(
            <main className="mind-game">
                <div className="row">
                    <div className="game-text column column-small">
                        <h1>Match Game</h1>
                        <h4>Rules</h4>
                        <p>
                            Click on a card to reveal the number on the other side. Click on a second card to try and find a match to the first. If you succeed, the pair will be removed from play. If not, try again!
                        </p>
                        <h4>How To Win</h4>
                        <p>
                            You win when all pairs have been found.
                        </p>
                        <h4>Select Difficulty</h4>
                        <Select
                            value={option}
                            placeholder="Select difficulty level..."
                            options={[
                                {label: 'Easy', value: 8},
                                {label: 'Medium', value: 16},
                            ]}
                            onChange={val=>this.setState({difficulty: val.label, tiles: val.value})}
                        />
                        {/* <button className="red">Reset</button> */}
                    </div>
                    <GameBoard tiles={this.state.tiles}/>
                </div>
            </main>
        )
    }
}
