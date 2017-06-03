import * as types from './action-types'

const initialState = {
    type: 'Easy',
    tiles: 8,
    cards: [],
    locked: false
}

export function initialize() {
    return {
        type: types.INITIAL_GAME,
        payload: initialState
    }
}

export function changeDifficulty(value) {
    const modifiedState = {
        type: value.label,
        tiles: value.value,
        cards: [],
        locked: false
    }
    return {
        type: types.CHANGE_DIFFICULTY,
        payload: modifiedState
    }
}
