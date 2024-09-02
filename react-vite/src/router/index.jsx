import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  EntriesListPage,
  Home,
  LoginFormPage,
  SignupFormPage,
  EntryDetailsPage,
  EntryFormPage,
  ActivitiesPage,
  LevelsPage,
} from "../components/pages";
import Layout from "./Layout";
import { FrontPageAnimation } from "../components/subcomponents";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<LoginFormPage />} />
      <Route path="signup" element={<SignupFormPage />} />
      <Route path="entries">
        <Route index element={<EntriesListPage />} />
        <Route path=":entryId">
          <Route index element={<EntryDetailsPage />} />
          <Route path="edit" element={<EntryFormPage type='edit'/>} />
        </Route>
        <Route path="new" element={<EntryFormPage />} />
      </Route>
      <Route path="activities" element={<ActivitiesPage />} />
      <Route path="levels" element={<LevelsPage />} />
      <Route path="moon" element={<FrontPageAnimation/>} />
    </Route>
  )
);
