import { render, screen } from "../../../helper/test-utils";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";    
import userFixtures from "../../../helper/fixtures/user";
import { expect } from "vitest";
import RegistrationForm from "../RegistrationForm";


const userData = userFixtures();

test("renders Registration form", async()=>{
    const user = userEvent.setup();
    render(<RegistrationForm/>)

    const loginForm = screen.getByTestId("registration-form");
    expect(loginForm).toBeInTheDocument();

    const firstNameField = screen.getByTestId("firstName-field");
    expect(firstNameField).toBeInTheDocument();

    const lastNameField = screen.getByTestId("lastName-field");
    expect(lastNameField).toBeInTheDocument();

    const emailField = screen.getByTestId("email-field");
    expect(emailField).toBeInTheDocument();

    const avatarField = screen.getByTestId("avatar-field");
    expect(avatarField).toBeInTheDocument();

    const passwordField = screen.getByTestId("password-field");
    expect(passwordField).toBeInTheDocument();

    const password = faker.lorem.slug(2);
    await user.type(firstNameField, userData.first_name)
    await user.type(lastNameField, userData.last_name)
    await user.type(emailField, userData.email);
    await user.type(passwordField, password);

    expect(emailField.value).toBe(userData.email);
    expect(passwordField.value).toBe(password);
    expect(firstNameField.value).toBe(userData.first_name);
    expect(lastNameField.value).toBe(userData.last_name);
})