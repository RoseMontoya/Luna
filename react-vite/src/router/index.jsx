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
} from "../components/pages";
import Layout from "./Layout";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<LoginFormPage />} />
      <Route path="signup" element={<SignupFormPage />} />
      <Route path="entries" >
        <Route index element={<EntriesListPage />} />
        <Route path=":entryId" element={<EntryDetailsPage />} />
      </Route>
    </Route>
  )
);
