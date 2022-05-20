import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";

const wrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

const customRender = (ui, options) => {
  render(ui, { wrapper, ...options });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
