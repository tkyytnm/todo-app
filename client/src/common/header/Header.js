import Nav from "./Nav";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { switchHam, closeHam, selectHamOpen } from "../commonSlice";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const hamOpen = useSelector(selectHamOpen);

  const handleClick = () => {
    dispatch(switchHam());
  };

  useEffect(() => {
    dispatch(closeHam());
  }, [dispatch, location]);

  return (
    <header>
      <h1>ToDo App</h1>
      <Nav />
      <div id="ham" className={hamOpen ? "open" : ""} onClick={handleClick}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;
