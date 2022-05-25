import Nav from "./Nav";
import { useState } from "react";

const Header = () => {
  const [hamburger, setHamburger] = useState(false);
  const switchHamburger = () => {
    setHamburger(!hamburger);
  };

  return (
    <header>
      <h1>ToDo App</h1>
      <Nav hamburger={hamburger} />
      <div
        id="ham"
        className={hamburger ? "open" : ""}
        onClick={switchHamburger}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;
