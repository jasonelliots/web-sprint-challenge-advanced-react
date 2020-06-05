import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />)

    const header = screen.getByText(/checkout form/i)

    expect(header).toBeInTheDocument()

});

test("form shows success message on submit with form details", () => {
    render(<CheckoutForm />)

    const firstName = screen.getByLabelText(/first name/i)
    const lastName = screen.getByLabelText(/last name/i)
    const address = screen.getByLabelText(/address/i)
    const city = screen.getByLabelText(/city/i)
    const state = screen.getByLabelText(/state/i)
    const zip = screen.getByLabelText(/zip/i)

    fireEvent.change(firstName, {
        target: {value: "Billy" }
      });
    fireEvent.change(lastName, {
        target: {value: "Bob" }
      });
      fireEvent.change(address, {
        target: {value: "123 Street" }
      });
      fireEvent.change(city, {
        target: {value: "London" }
      });
      fireEvent.change(state, {
        target: {value: "Michigan" }
      });
      fireEvent.change(zip, {
        target: {value: "54321" }
      });


    const submitButton = screen.getByTestId(/checkout/i)
    fireEvent.click(submitButton)

    const successMessage = screen.getByTestId('successMessage')
    expect(successMessage).toBeInTheDocument()

    const details = screen.getByText(/billy/i)
    expect(details).toBeInTheDocument()

});
