import { csrfFetch } from "./csrf"

const GET_ACTIVITIES = 'activities/getActivities'

const getActivities = (activities) => {
    return {
        type: GET_ACTIVITIES,
        activities
    }
}

export const getAllActivities = () => async dispatch => {
    const response = await csrfFetch('/api/activities')

    const activities = await response.json()
    dispatch(getActivities(activities))
    return activities
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
        default:
            return state
    }
}

export default activitiesReducer
