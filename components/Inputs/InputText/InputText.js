import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
  Flex
} from "@chakra-ui/react";
import HelpText from "@/components/Guidance/HelpText";

/**
 * This component adapts an input[type=text] using Chakra UI
 * and integrates with the useForm hook from react-hook-form
 */

export function InputText({
  id,
  question,
  isInvalid,
  optional,
  register,
  label,
  type,
  placeholder,
  pattern,
  patternMessage,
  minLength,
  maxLength,
  validate,
  errormessage,
  helpText,
}) {
  const validation = {
    ...({ required: {value: !optional, message: "Required"}}),
    ...(pattern && {
      pattern: { value: pattern, message: patternMessage },
    }),
    ...(minLength && {
      minLength: {
        value: minLength,
        message: "Min Length not met.",
      },
    }),
    ...(maxLength && {
      maxLength: {
        value: maxLength,
        message: "Max Length exceeded.",
      },
    }),
    ...(validate && { validate: validate }),
  };

  return (
    <FormControl p={4} isInvalid={isInvalid} id={id}>
      <Flex wrap justifyContent="flex-start" alignItems="center" pb={2}>
        <FormLabel m={0} pr={2} htmlFor={id}>
          {question}
          {!optional ? (
            <Text as="span" color="red">
              {" "}
              *
            </Text>
          ) : null}
        </FormLabel>
        {helpText ? <HelpText message={helpText} /> : null}
      </Flex>
      {label ? <Text>{label}</Text> : null}
      <Input
        type={type && type}
        placeholder={placeholder && placeholder}
        {...register(id, validation)}
      />
      <FormErrorMessage>{errormessage}</FormErrorMessage>
    </FormControl>
  );
}

InputText.propTypes = {
  /**
   * id attribute for unique identification of the form control
   */
  id: PropTypes.string.isRequired,
  /**
   * the question
   */
  question: PropTypes.string.isRequired,
  isInvalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  optional: PropTypes.bool.isRequired,
  register: PropTypes.func,
  /**
   * the text that appears above the input box
   */
  label: PropTypes.string,
  type: PropTypes.string,
  /**
   * the placeholder text for the input box
   */
  placeholder: PropTypes.string,
  /**
   * the RegEx pattern the answer is expected to follow
   */
  pattern: PropTypes.string,
  /**
   * Custom validation function
   */
  validate: PropTypes.func,
  /**
   * the message that arises if the pattern is not met
   */
  patternMessage: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  errormessage: PropTypes.string,
  helpText: PropTypes.string
};

InputText.defaultProps = {
  isInvalid: false,
  optional: false,
};
