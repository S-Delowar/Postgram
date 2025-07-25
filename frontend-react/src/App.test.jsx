import { render, screen } from "./helper/test-utils";
import App from "./App";
import { expect } from "vitest";
import { BrowserRouter } from "react-router-dom";


test("renders learn react link", ()=>{
    render(
            <App/>
    );
    const linkElement = screen.getByText(/Welcome to Postman/i);
    expect(linkElement).toBeInTheDocument();
});