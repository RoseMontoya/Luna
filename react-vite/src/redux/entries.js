import { csrfFetch } from "./csrf"
import { format} from 'date-fns'

// * Helper Funcs
const formatDate = (entry) => {
    const formattedDate = format(entry.datetime, "EEEE, MMM d . h:mm a").split(" . ")
    entry.date = formattedDate[0]
    entry.time = formattedDate[1]
    // delete entry.datetime
    return entry
}

const ALL_ENTRIES = 'entries/all-entries'
const ENTRY_BY_ID = 'entries/entry-by-id'
const ENTRIES_TODAY = 'entries/entries-today'
const ADD_ENTRY = 'entries/add-entry'
const UPDATE_ENTRY = 'entries/update-entry'

// * Actions
const addAllEntries = (entries) => {
    return {
        type: ALL_ENTRIES,
        entries
    }
}

const entryById = (entry) => {
    return {
        type: ENTRY_BY_ID,
        entry
    }
}

const addEntriesToday = (entries) => {
    return {
        type: ENTRIES_TODAY,
        entries
    }
}

const addEntry = (payload) => {
    return {
        type: ADD_ENTRY,
        payload
    }
}

const updateEntry = (payload) => {
    return {
        type: UPDATE_ENTRY,
        payload
    }
}

// * Thunk
export const getAllEntries = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/entries`)

    const data = await response.json()

    data.map(entry => {
        formatDate(entry)
    })

    dispatch(addAllEntries(data))
    return data
}

export const getEntryById = (entryId) => async dispatch => {

    const response = await csrfFetch(`/api/entries/${entryId}`)

    const entry = formatDate(await response.json())

    dispatch(entryById(entry))
    return entry
}

export const getEntriesToday = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}/today`)

    const data = await response.json()
    data.map(entry => {
        formatDate(entry)
    })
    dispatch(addEntriesToday(data))
    return data
}

export const createEntry = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/entries`, {
        method: 'POST',
        body: JSON.stringify(payload)
    })

    const data = formatDate(await response.json())
    dispatch(addEntry(data))
    return data
}

export const editEntry = (payload, entryId) => async dispatch => {
    const response = await csrfFetch(`/api/entries/${entryId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    })

    const data = formatDate(await response.json())
    console.log('UPADATED', data)
    dispatch(updateEntry(data))
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
        case ENTRY_BY_ID: {
            return {...state, entriesById: {...state.entriesById, [action.entry.id] : action.entry}}
        }
        case ENTRIES_TODAY: {
            return {...state, today: action.entries}
        }
        case ADD_ENTRY: {
            const newState = {}

            if (state.allEntries) {
                const newAll = {...state.allEntries}
                newAll[action.payload.id] = action.payload
                newState['allEntries'] = newAll
            }

            const isToday = action.payload.datetime >= new Date().toDateString()

            if (isToday) {
                const newToday = {...state.today}

                newToday[action.payload.id] = action.payload

                newState['today'] = newToday
            }

            return newState
        }
        case UPDATE_ENTRY: {
            const newState = {}

            if (state.allEntries) {
                const newAll = {...state.allEntries}
                newAll[action.payload.id] = action.payload
                newState['allEntries'] = newAll
            }

            const isToday = action.payload.datetime >= new Date().toDateString()

            if (isToday) {
                const newToday = {...state.today}

                newToday[action.payload.id] = action.payload

                newState['today'] = newToday
            }

            if (state.entriesById[action.payload.id]) {
                const newById = {...state.entriesById}
                newById[action.payload.id] = action.payload
                newState['entriesById'] = newById
            }

            return newState
        }
        default:
            return state
    }
}

export default entriesReducer
