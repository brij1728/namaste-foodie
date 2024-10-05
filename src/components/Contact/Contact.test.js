import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { Contact } from './Contact';

describe(' Contact Us Page Teast Cases', () => {
	// can use it or test
  it('Should load contact us component', () => {
    render(<Contact />); //Render the Contact component to jsdom

    const heading = screen.getByRole('heading', { name: 'Contact' }); //Assert that the Contact Us heading is present
    //const button = screen.getByRole("button", {name: "Submit"}); //Assert that the Submit button is present

    expect(heading).toBeInTheDocument(); //Assert that the Contact Us heading is present
  });

  test('Should load button inside Contact component', () => {
    render(<Contact />); //Render the Contact component to jsdom

    const button = screen.getByRole('button', { name: 'Submit' }); //Assert that the Submit button is present

    //Assert that the Contact Us heading is present
    expect(button).toBeInTheDocument();
  });

  test('Should load input fields inside Contact component', () => {
    render(<Contact />); //Render the Contact component to jsdom

    const inputName = screen.getByPlaceholderText('Name'); //Assert that the input fields are present

    //Assert that the input fields are present
    expect(inputName).toBeInTheDocument();
  });

  test('Should load 2 input fields inside Contact component', () => {
    //Render the Contact component to jsdom
    render(<Contact />);

    //Assert that the input fields are present
    const inputFields = screen.getAllByRole('textbox');

    console.log(inputFields.length);

    //Assert that the input fields are present
    expect(inputFields.length).toBe(3);
  });
});
