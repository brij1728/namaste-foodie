import '@testing-library/jest-dom';

import { render, screen } from "@testing-library/react";

import { Contact } from "./Contact";

test("Should load contact us component", () => {
	
	render(<Contact />); //Render the Contact component to jsdom

	const heading = screen.getByRole("heading", {name: "Contact"}); //Assert that the Contact Us heading is present
	const button = screen.getByRole("button", {name: "Submit"}); //Assert that the Submit button is present

	expect(button).toBeInTheDocument(); //Assert that the Contact Us heading is present
})