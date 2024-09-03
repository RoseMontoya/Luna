import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import * as sessionActions from "../redux/session";
import { Navigation } from '../components/pages'
import { NavProvider } from "../context/navContext";


export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <NavProvider>
      <ModalProvider>
        <ScrollRestoration />
        <Navigation />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
      </NavProvider>
    </>
  );
}
