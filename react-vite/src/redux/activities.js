import { csrfFetch } from "./csrf"

const GET_ACTIVITIES = 'activities/getActivities'
const ADD_ACTIVITY = 'activities/addActivity'
const UPDATE_ACTIVITY = 'activities/updateActivity'

const getActivities = (activities) => {
    return {
        type: GET_ACTIVITIES,
        activities
    }
}

const addActivity = (activity) => {
    return {
        type: ADD_ACTIVITY,
        activity
    }
}

const updateActivity = (activity) => {
    return {
        type: UPDATE_ACTIVITY,
        activity
    }
}

export const getAllActivities = () => async dispatch => {
    const response = await csrfFetch('/api/activities')

    const activities = await response.json()
    dispatch(getActivities(activities))
    return activities
}

export const createActivity = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/activities`, {
        method: 'POST',
        body: JSON.stringify(payload)
    })

    const activity = await response.json()
    dispatch(addActivity(activity))
    return activity
}

export const editActivity = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/activities/${payload.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    })

    const data = await response.json()
    dispatch(updateActivity(data))
    return data
}

const activitiesReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ACTIVITIES: {
            const newState = {}
            action.activities.forEach(activity => {
                newState[activity.id] = activity
            })
            return {...state, allActivities: newState}
        }
        case ADD_ACTIVITY: {
            return {...state, allActivities: {...state.allActivities, [action.activity.id] : action.activity}}
        }
        case UPDATE_ACTIVITY: {
            const newState = {...state.allActivities}
            newState[action.activity.id] = action.activity
            return {...state, allActivities: newState}

        }
        default:
            return state
    }
}

export default activitiesReducer
