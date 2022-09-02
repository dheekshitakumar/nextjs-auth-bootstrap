import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Text,
  Flex
} from "@chakra-ui/react";
import HelpText from "@/components/Guidance/HelpText";

/**
 * This component adapts an input[type=text] using Chakra UI
 * and integrates with the useForm hook from react-hook-form
 */

export function InputTextArea({
  id,
  question,
  isInvalid,
  optional,
  register,
  label,
  type,
  placeholder,
  validate,
  errormessage,
  helpText,
}) {
  const validation = {
    ...({ required: {value: !optional, message:"Required"} }),
    ...(validate && { validate: validate }),
  };

  return (
    <FormControl
      p={4}
      isInvalid={isInvalid}
      id={id}
    >
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
      <Textarea
        type={type && type}
        placeholder={placeholder && placeholder}
        {...register(id, validation)}
      />
      <FormErrorMessage>{errormessage}</FormErrorMessage>
    </FormControl>
  );
}

InputTextArea.propTypes = {
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
   * Custom validation function
   */
  validate: PropTypes.func,
  errormessage: PropTypes.string,
  helpText: PropTypes.string
};

InputTextArea.defaultProps = {
  isInvalid: false,
  optional: false,
};
