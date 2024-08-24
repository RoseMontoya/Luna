import { csrfFetch } from "./csrf"

const GET_ICONS = 'icons/getIcons'
const ADD_MOOD_ICONS = 'icons/addMoodIcons'

const getIcons = (icons) => {
    return {
        type: GET_ICONS,
        icons
    }
}

const addMoodIcons = (icons) => {
    return {
        type: ADD_MOOD_ICONS,
        icons
    }
}

export const getAllIcons = () => async dispatch => {
    const response = await csrfFetch(`/api/icons`)
    const data = await response.json()
    dispatch(getIcons(data))
    return data
}

export const getMoodIcons = () => async dispatch => {
    const response = await csrfFetch(`/api/icons/mood`)

    const icons = await response.json()
    dispatch(addMoodIcons(icons))
    return icons
}

const iconReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ICONS: {
            const icons = {}
            action.icons.forEach(icon => {
                icons[icon.id] = icon
            })
            return {...state, allIcons: icons}
        }
        case ADD_MOOD_ICONS: {
            const icons = {}
            action.icons.forEach(icon => {
                icons[icon.id] = icon
            })
            return {...state, moodIcons: icons}
        }
        default:
            return state;
    }
}

export default iconReducer
