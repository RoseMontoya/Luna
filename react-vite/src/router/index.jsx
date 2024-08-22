import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { EntriesListPage, Home, LoginFormPage, SignupFormPage } from '../components/pages';
import Layout from './Layout';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />}/>
      <Route path='login' element={<LoginFormPage />}/>
      <Route path='signup' element={<SignupFormPage />}/>
      <Route path='entries' element={<EntriesListPage />}/>
    </Route>
  )
);
