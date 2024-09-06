import { csrfFetch } from "./csrf";

const GET_ICONS = "icons/getIcons";

// * Actions
const getIcons = (icons) => {
  return {
    type: GET_ICONS,
    icons,
  };
};

// * Thunks
export const getAllIcons = () => async (dispatch) => {
  const response = await csrfFetch(`/api/icons`);
  const data = await response.json();
  dispatch(getIcons(data));
  return data;
};

// * Reducer
const iconReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ICONS: {
      const icons = {};
      action.icons.forEach((icon) => {
        icons[icon.id] = icon;
      });
      return { ...state, allIcons: icons };
    }
    default:
      return state;
  }
};

export default iconReducer;
