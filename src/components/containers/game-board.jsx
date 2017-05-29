import React, {Component} from 'react'

const COLORS = [
    "#e74c3c",
    "#27ae60",
    "#8e44ad",
    "#d35400",
    "#f1c40f"
]

const CARDBGCOLOR = "#0B4F6C"

const FIXEDCOLOR = "#757575"

export default class GameBoard extends Component {

    initialState = {
        number: 8,
        cards: [],
        leftCards: []
    }

    constructor(props) {
        super(props)
        this.state = this.initialState
    }

    componentDidMount() {
        this._setCards()
        setTimeout(()=>{
            this.initialState = this.state
        }, 100)
    }

    componentDidUpdate() {
        console.log(this.state.leftCards)

    }

    _flippedCards = []
    _prevIndex = null


    render() {
        return(
            <section className="game-board column">
                {this.state.cards.map((card, i) => {
                    return <Card value={card.value} active={card.active} fixed={card.fixed} onClick={e=>this._evaluate(card, i)} color={card.bgcolor}/>
                })}
            </section>
        )
    }

    _evaluate = (card, index) => {
        let tempArray = this.state.cards
        if(index!==this._prevIndex) {
            console.log('INITIAL BEFORE MATCH', this._prevIndex)
            this._prevIndex = index
            console.log('AFTER MATCH', this._prevIndex)
        }
        else {
            console.log('IF MATCHED BEFORE', this._prevIndex)
            this._prevIndex = null
            console.log('IF MATCHED AFTER', this._prevIndex)
            return
        }

        if(this._flippedCards.length<2) {
            this._flippedCards.push(card)
            tempArray[index].active = true
            tempArray[index].bgcolor = COLORS[Math.floor(Math.random()*5)]
            this.setState({cards: tempArray})
        }
        if(this._flippedCards.length==2) {
            if(this._flippedCards[0].value==this._flippedCards[1].value) {
                for(var i = 0; i < this._flippedCards.length; i++) {
                    this._flippedCards[i].fixed = true
                    this._flippedCards[i].bgcolor = FIXEDCOLOR
                }

                while(this._flippedCards.length) {
                    this._flippedCards.pop()
                }

            }
            else {
                setTimeout(()=>{
                    for(var i = 0; i < this._flippedCards.length; i++) {
                        this._flippedCards[i].active = false
                        this._flippedCards[i].bgcolor = CARDBGCOLOR
                    }
                    this._prevIndex = null
                    let initialState = this.initialState
                    this.setState({cards: initialState.cards})
                    // console.log('SETTIMEOUT WHEN VALUES DONT MATCH')
                    while(this._flippedCards.length) {
                        this._flippedCards.pop()
                    }
                    // console.log('FLIPPED ARRAY EMPTY', this._flippedCards)
                }, 500)
            }
        }


    }

    _setCards = () => {
        let cards = {arr:[]}
        let length = this.state.number
        for(var i = 0; i < 2; i++) {
            for(var j=0;j<length;j++) {
                cards.arr.push({
                    value: j+1,
                    active: false,
                    fixed: false,
                    bgcolor: "#0B4F6C"
                })
            }
        }

        this._randomize(cards.arr)

    }

    _randomize = (arr) => {
        for(var i = arr.length-1; i > 0; i--) {
            let j = Math.floor(Math.random()*arr.length)
            let tmp = arr[i]
            arr[i] = arr[j]
            arr[j] = tmp
        }
        this.setState({cards: arr})
    }

}

class Card extends Component {

    render() {
        let activeClassName = (this.props.active)?("active"):("")
        let fixedClassName = (this.props.fixed)?("fixed"):("")
        return(
            <div className={"card "+activeClassName+" "+fixedClassName} onClick={this.props.onClick} style={{backgroundColor: this.props.color}}>
                <span>{this.props.value || null}</span>
            </div>
        )
    }
}
