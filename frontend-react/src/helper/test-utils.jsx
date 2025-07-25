// test-utils.jsx
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Context } from "../components/Layout"; // ✅ your context import

function render(ui, { providerProps = {}, ...renderOptions } = {}) {
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <Context.Provider value={providerProps}>
        {children}
      </Context.Provider>
    </BrowserRouter>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}


export * from "@testing-library/react";
export { render };
