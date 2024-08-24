import { csrfFetch } from "./csrf"

const GET_LEVELS = 'levels/getLevels'

const getLevels = (levels) => {
    return {
        type: GET_LEVELS,
        levels
    }
}

export const getAllLevels = () => async dispatch => {
    const response = await csrfFetch('/api/levels')

    const levels = await response.json()
    dispatch(getLevels(levels))
    return levels
}

const levelsReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_LEVELS: {
            const newState = {}
            action.levels.forEach(level => {
                newState[level.id] = level
            })
            return {...state, allLevels: newState}
        }
        default:
            return state
    }
}

export default levelsReducer
