import React from "react";
import { render, waitFor, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InputText } from "../InputText";
import { useForm } from "react-hook-form";
import { act } from "react-dom/test-utils";

const validComponent = (
  <InputText
    id="testid"
    question="test question?"
    isInvalid={false}
    optional={false}
    register={jest.fn()}
    label="Label"
    placeholder="placeholder"
    errormessage="Error message"
    helpText="help Text"
  />
);

const errorComponent = (
  <InputText
    id="testid"
    question="test question?"
    isInvalid={true}
    optional={true}
    register={jest.fn()}
    label="Label"
    placeholder="placeholder"
    errormessage="Error message"
    helpText="help Text"
  />
);

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
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        id="testid"
        question="test question?"
        isInvalid={errors.testid}
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

describe("InputText", () => {
  it("renders question & label", async () => {
    render(validComponent);
    await waitFor(() => screen.getByText("question", { exact: false }));
    const questiontext = screen.getByText("question",{ exact: false });
    const labeltext = screen.getByText("Label", { exact: false });
    expect(questiontext).toHaveTextContent('test question?*');
    expect(labeltext).toBeTruthy();
    
  });

  it("renders textbox with placeholder", async () => {
    render(validComponent);
    await waitFor(() => screen.getByRole("textbox"));
    const textbox = screen.getByRole("textbox");
    expect(textbox).toBeTruthy();
    expect(textbox).toHaveProperty('placeholder','placeholder');
  });

  it("does not render error message when valid", async () => {
    render(validComponent);
    await waitFor(() => screen.getByRole("textbox"));
    expect(screen.queryByText("Error message")).toBeNull();
  });

  it("renders error message when invalid", async () => {
    render(errorComponent);
    await waitFor(() => screen.getByRole("textbox"));
    const errorMessage = screen.queryByText("Error message");
    expect(errorMessage).toBeTruthy();
  });

  it("correct value is submitted when input modified in a form", async () => {
    console.log = jest.fn();
    await act(async () => {
      render(<FormComponent />);
    })
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.change(input, { target: { value: "some value" } });
      fireEvent.submit(button);
    })
    expect(input.value).toBe("some value");
    expect(console.log).toBeCalledWith({"testid": "some value"})
  });

});
