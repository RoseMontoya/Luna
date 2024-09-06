import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./csrf";
import {
  clearActivities,
  getAllActivities,
  createActivity,
  editActivity,
  deleteActivity,
} from "./activities";
import {
  clearEntries,
  getAllEntries,
  getEntryById,
  getEntriesToday,
  createEntry,
  editEntry,
  deleteEntry,
} from "./entries";
import { getAllIcons } from "./icons";
import {
  clearLevels,
  getAllLevels,
  createLevel,
  editLevel,
  deleteLevel,
} from "./levels";
import { login, restoreUser, signup, logout } from "./session";

export {
  restoreCSRF,
  csrfFetch,
  clearActivities,
  getAllActivities,
  createActivity,
  editActivity,
  deleteActivity,
  clearEntries,
  getAllEntries,
  getEntryById,
  getEntriesToday,
  createEntry,
  editEntry,
  deleteEntry,
  getAllIcons,
  clearLevels,
  getAllLevels,
  createLevel,
  editLevel,
  deleteLevel,
  login,
  restoreUser,
  signup,
  logout,
};
export default configureStore;
