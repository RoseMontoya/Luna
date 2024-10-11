import { csrfFetch } from "./csrf";
import { format } from "date-fns";

// * Helper Funcs
// Formats datetime from entries
const formatDate = (entry) => {
  console.log('datetime', entry.datetime)
  const formattedDate = format(entry.datetime, "EEEE, MMM d . h:mm a").split(
    " . "
  );
  console.log('formatted', formattedDate)
  entry.date = formattedDate[0];
  entry.time = formattedDate[1];

  return entry;
};

const ALL_ENTRIES = "entries/all-entries";
const ENTRY_BY_ID = "entries/entry-by-id";
const ENTRIES_TODAY = "entries/entries-today";
const ADD_ENTRY = "entries/add-entry";
const UPDATE_ENTRY = "entries/update-entry";
const REMOVE_ENTRY = "entries/remove-entry";
const CLEAR = "entries/clear-entries";

// * Actions
const addAllEntries = (entries) => {
  return {
    type: ALL_ENTRIES,
    entries,
  };
};

const entryById = (entry) => {
  return {
    type: ENTRY_BY_ID,
    entry,
  };
};

const addEntriesToday = (entries) => {
  return {
    type: ENTRIES_TODAY,
    entries,
  };
};

const addEntry = (payload) => {
  return {
    type: ADD_ENTRY,
    payload,
  };
};

const updateEntry = (payload) => {
  return {
    type: UPDATE_ENTRY,
    payload,
  };
};

const removeEntry = (entryId) => {
  return {
    type: REMOVE_ENTRY,
    entryId,
  };
};

export const clearEntries = () => ({
  type: CLEAR,
});

// * Thunk
// Get all entries
export const getAllEntries = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/entries`);

  const data = await response.json();

  data.map((entry) => {
    formatDate(entry);
  });

  dispatch(addAllEntries(data));
  return data;
};

// Get entry by id
export const getEntryById = (entryId) => async (dispatch) => {
  const response = await csrfFetch(`/api/entries/${entryId}`);

  const entry = formatDate(await response.json());

  dispatch(entryById(entry));
  return entry;
};

// Get all of a user's entries for the current day
export const getEntriesToday = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${userId}/today`);

  const data = await response.json();
  data.map((entry) => {
    formatDate(entry);
  });

  dispatch(addEntriesToday(data));
  return data;
};

// Create entry
export const createEntry = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/entries`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const data = formatDate(await response.json());
  dispatch(addEntry(data));
  return data;
};

// Edit entry
export const editEntry = (payload, entryId) => async (dispatch) => {
  const response = await csrfFetch(`/api/entries/${entryId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  const data = formatDate(await response.json());
  dispatch(updateEntry(data));
  return data;
};

// Delete entry
export const deleteEntry = (entryId) => async (dispatch) => {
  const response = await csrfFetch(`/api/entries/${entryId}`, {
    method: "DELETE",
  });

  const data = await response.json();
  dispatch(removeEntry(entryId));
  return data;
};

const initialState = {};

// * Entries reducer
const entriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ENTRIES: {
      const newState = {};
      action.entries.forEach((entry) => {
        newState[entry.id] = entry;
      });
      return { ...state, allEntries: newState };
    }
    case ENTRY_BY_ID: {
      return {
        ...state,
        entriesById: { ...state.entriesById, [action.entry.id]: action.entry },
      };
    }
    case ENTRIES_TODAY: {
      const newState = {};
      action.entries.forEach((entry) => {
        newState[entry.id] = entry;
      });
      return { ...state, today: newState };
    }
    case ADD_ENTRY: {
      const newState = {};

      // if allEntries exists in state
      if (state.allEntries) {
        const newAll = { ...state.allEntries };
        newAll[action.payload.id] = action.payload;
        newState["allEntries"] = newAll;
      }

      console.log('entry date', new Date(action.payload.datetime), 'current date', new Date() )
      const isToday =
        new Date(action.payload.datetime).toDateString() ===
        new Date().toDateString();

      // if entry is for today and today exist in state
      if (isToday && state.today) {
        const newToday = { ...state.today };
        newToday[action.payload.id] = action.payload;

        newState["today"] = newToday;
      }

      return { ...state, ...newState };
    }
    case UPDATE_ENTRY: {
      const newState = {};

      // if entry is in allEntries state
      if (state.allEntries?.[action.payload.id]) {
        const newAll = { ...state.allEntries };
        newAll[action.payload.id] = action.payload;
        newState["allEntries"] = newAll;
      }

      console.log('entry date', new Date(action.payload.datetime), 'current date', new Date() )

      const isToday =
        new Date(action.payload.datetime).toDateString() ===
        new Date().toDateString();

      // if entry is for today and today exist in state
      if (isToday && state.today) {
        const newToday = { ...state.today };
        newToday[action.payload.id] = action.payload;
        newState["today"] = newToday;
      }

      // If entry exists in the entriesById state
      if (state.entriesById?.[action.payload.id]) {
        const newById = { ...state.entriesById };
        newById[action.payload.id] = action.payload;
        newState["entriesById"] = newById;
        console.log("newById", newById);
      }

      return { ...state, ...newState };
    }
    case REMOVE_ENTRY: {
      const newState = {};

      // if entry exists in allEntries state
      if (state.allEntries?.[action.entryId]) {
        const newAll = { ...state.allEntries };
        delete newAll[action.entryId];
        newState["allEntries"] = newAll;
      }

      // if entry exists in today state
      if (state.today?.[action.entryId]) {
        const newToday = { ...state.today };

        delete newToday[action.entryId];

        newState["today"] = newToday;
      }

      // If entry exists in the entriesById state
      if (state.entriesById?.[action.entryId]) {
        const newById = { ...state.entriesById };
        delete newById[action.entryId];
        newState["entriesById"] = newById;
      }

      return { ...state, ...newState };
    }
    case CLEAR: {
      return {};
    }
    default:
      return state;
  }
};

export default entriesReducer;
