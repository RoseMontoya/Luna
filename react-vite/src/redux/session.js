import { csrfFetch } from "./csrf";

const SET_CURRENT_USER = '/store/session/SET_CURRENT_USER';
const REMOVE_USER = '/store/session/REMOVE_USER';


// Actions
const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

const loadIcons = (icons) => {
    return {
        type: "LOAD_ICONS",
        payload: icons
    }
}

// * Thunks

// Login
export const login = (user) => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    const data = await response.json()
    dispatch(setCurrentUser(data));
    return data
}

// Restore User
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const user = await response.json();
    dispatch(setCurrentUser(user))
    return response;
}

// Signup
export const signup = (payload) => async dispatch => {
    const response = await csrfFetch('/api/users', {
        method: 'post',
        body: JSON.stringify(payload)
    });

    const user = await response.json();
    dispatch(setCurrentUser(user));
    return user;
}

//Logout
export const logout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'delete'
    })
    dispatch(removeUser())
    return response;
}

export const getIcons = () => async dispatch => {
    const response = await csrfFetch('/api/users/icons')
    const data = await response.json()
    dispatch(loadIcons(data))
    return data
}

// Reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER: {
            return {...state, ...action.user};
        }
        case REMOVE_USER: {
            return {...state, user: null };
        }
        case "LOAD_ICONS": {
            const icons = {}
            action.payload.forEach(icon => {
                icons[icon.id] = icon
            })
            return {...state, icons: icons}
        }
        default:
            return state;
    }
};

export default sessionReducer;
