import React from "react";
import {
  render,
  waitFor,
  screen,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputSelect } from "../InputSelect";
import { useForm } from "react-hook-form";
import { act } from "react-dom/test-utils";


function FormComponent() {
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputSelect
        id="testid"
        question="test question?"
        options={["Option 1", "Option 2", "Option 3"]}
        isInvalid={false}
        optional={false}
        register={register}
        label="Label"
        placeholder="placeholder"
        errormessage="Error message"
        helpText="help Text"
      />
      <button type="submit">SUBMIT</button>
    </form>
  );
}

afterEach(() => cleanup);

describe("InputSelect", () => {
  it("correct value is submitted when input modified in a form", async () => {
    console.log = jest.fn();
    await act(async () => {
      render(<FormComponent />);
    });
    const input = screen.getByRole("combobox");
    const options = screen.getAllByRole("option");
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.change(input, { target: { value: "Option 2" } });
      fireEvent.submit(button);
    });
    expect(options[0].selected).toBeFalsy(); //placeholder
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeTruthy();
    expect(options[3].selected).toBeFalsy();
    expect(console.log).toBeCalledWith({ testid: "Option 2" });
  });
});