import React from "react";
import {
  Flex,
  Text,
  useCheckboxGroup,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";
import { useController } from "react-hook-form";
import HelpText from "@/components/Guidance/HelpText";

export function InputCheckbox({
  control,
  name,
  question,
  label,
  helpText,
  options,
  optional,
  validate
}) {

  const validation = {
    ...{ required: { value: !optional, message: "Required" } },
    ...(validate && { validate: validate }),
  };

  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name,
    ...({
      rules: validation,
    }),
  });

  const answers = options.map((val) => {
    if (typeof val === "string") {
      return {
        label: val,
        value: val,
      };
    } else {
      return {
        label: val[0],
        value: val[1],
      };
    }
  });

  const { getCheckboxProps } = useCheckboxGroup({
    name,
    onChange: field.onChange,
    value: field.value,
  });

  return (
    <FormControl
      isInvalid={errors[name]}
      mb={6}
      id={name}
      p={4}
    >
      <Flex wrap justifyContent="flex-start" alignItems="center" pb={2}>
        <FormLabel m={0} pr={2} htmlFor={name}>
          {question}
          {!optional ? (
            <Text as="span" color="red"> *</Text>
          ) : null}
        </FormLabel>
        {helpText ? <HelpText message={helpText} /> : null}
      </Flex>
      {label ? <Text>{label}</Text> : null}
      <Stack>
        {answers.map((ans) => {
          const value = ans.value;
          const label = ans.label;
          const radio = getCheckboxProps({ value: value, children: label });
          return (
            <Checkbox id={name} {...radio} key={value}>
              {label}
            </Checkbox>
          );
        })}
      </Stack>
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
}
