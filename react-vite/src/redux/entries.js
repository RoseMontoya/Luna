import { csrfFetch } from "./csrf"
import { format } from 'date-fns'

const ALL_ENTRIES = 'entries/all-entries'

// * Actions
const addAllEntries = (entries) => {
    return {
        type: ALL_ENTRIES,
        entries
    }
}

// * Thunk
export const getAllEntries = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/entries`)

    const data = await response.json()

    data.map(entry => {
        const formattedDate = format(entry.datetime, "EEEE, MMM d . h:mm a").split(" . ")
        entry.date = formattedDate[0]
        entry.time = formattedDate[1]
        delete entry.datetime
    })
    dispatch(addAllEntries(data))
    return data
}

const initialState = {}

const entriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_ENTRIES: {
            const newState = {}
            action.entries.forEach(entry => {
                newState[entry.id] = entry
            })
            return {...state, allEntries: newState}
        }
        default:
            return state
    }
}

export default entriesReducer
