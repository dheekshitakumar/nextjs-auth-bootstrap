import React from "react";
import {
  render,
  waitFor,
  screen,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputRadio } from "../InputRadio";
import { useForm } from "react-hook-form";
import { act } from "react-dom/test-utils";

/**
 * 
 * TO DO (dheekshita): Add tests for differing labels from values
 */

function FormComponent() {
  const {
    handleSubmit,
    control,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputRadio
        name="testid"
        question="test question?"
        options={["Option 1", "Option 2", "Option 3"]}
        optional={false}
        control={control}
        label="Label"
        helpText="help Text"
      />
      <button type="submit">SUBMIT</button>
    </form>
  );
}

afterEach(() => cleanup);

describe("InputRadio", () => {
  it("correct value is submitted when input modified in a form", async () => {
    console.log = jest.fn();
    await act(async () => {
      render(<FormComponent />);
    });
    const options = screen.getAllByRole("radio");
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(options[1]);
    });
    expect(options[0]).not.toBeChecked();
    expect(options[2]).not.toBeChecked();

    await act(async () => {
      fireEvent.click(options[0]);
    });
   expect(options[1]).not.toBeChecked();
   expect(options[2]).not.toBeChecked();

    await act(async () => {
      fireEvent.click(options[2]);
      fireEvent.submit(button);
    });
    expect(options[0]).not.toBeChecked();
    expect(options[1]).not.toBeChecked();
    expect(console.log).toBeCalledWith({ testid: "Option 3" });
  });
});