import { createContext, useContext, useState } from "react";

const NavContext = createContext();

export function useNav() {
  return useContext(NavContext);
}

export function NavProvider({ children }) {
  const [navOpen, setNavOpen] = useState(true);

  const toggleNav = () => setNavOpen((prev) => !prev);

  return (
    <NavContext.Provider value={{ navOpen, toggleNav }}>
      {children}
    </NavContext.Provider>
  );
}
