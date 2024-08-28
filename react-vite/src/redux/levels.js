import { csrfFetch } from "./csrf"

const GET_LEVELS = 'levels/getLevels'
const ADD_LEVEL = 'levels/addLevel'
const UPDATE_LEVEL ='levels/updateLevel'
const REMOVE_LEVEL = 'levels/removeLevel'

const getLevels = (levels) => {
    return {
        type: GET_LEVELS,
        levels
    }
}

const addLevel = (level) => {
    return {
        type: ADD_LEVEL,
        level
    }
}

const updateLevel = (level) => {
    return {
        type: UPDATE_LEVEL,
        level
    }
}

const removeLevel = (levelId) => {
    return {
        type: REMOVE_LEVEL,
        levelId
    }
}

export const getAllLevels = () => async dispatch => {
    const response = await csrfFetch('/api/levels')

    const levels = await response.json()
    dispatch(getLevels(levels))
    return levels
}

export const createLevel = (level) => async dispatch => {
    console.log('in thunk', level)
    const response = await csrfFetch(`/api/levels`, {
        method: 'POST',
        body: JSON.stringify(level)
    })

    const data = await response.json()
    dispatch(addLevel(data))
    return data
}

export const editLevel = (level) => async dispatch => {
    const response = await csrfFetch(`/api/levels/${level.id}`, {
        method: 'PUT',
        body: JSON.stringify(level)
    })

    const data = await response.json()
    dispatch(updateLevel(data))
    return data
}

export const deleteLevel = (levelId) => async dispatch => {
    const response = await csrfFetch(`/api/levels/${levelId}`, { method: 'DELETE' })

    const data = await response.json()
    dispatch(removeLevel(levelId))
    return data
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
        case ADD_LEVEL: {
            const newState = {...state.allLevels}
            newState[action.level.id] = action.level
            return {...state, allLevels: newState}
        }
        case UPDATE_LEVEL: {
            const newState = {...state.allLevels}
            newState[action.level.id] = action.level
            return {...state, allLevels: newState}
        }
        case REMOVE_LEVEL: {
            const newState = {...state.allLevels}
            delete newState[action.levelId]
            console.log(newState)
            return {...state, allLevels: newState}
        }
        default:
            return state
    }
}

export default levelsReducer
