import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  Flex,
  Text
} from '@chakra-ui/react';
import PropTypes from "prop-types";
import HelpText from "@/components/Guidance/HelpText";

/**
 * This component adapts a <select> input using Chakra UI
 * and integrates with the useForm hook from react-hook-form
 */

export function InputSelect({
  id,
  question,
  options,
  isInvalid,
  optional,
  register,
  label,
  placeholder,
  errormessage,
  helpText,
  validate
}) {
  const validation = {
    ...{ required: { value: !optional, message: "Required" } },
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
      <Select
        placeholder={placeholder}
        {...register(id, validation)}
      >
        {options.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{errormessage}</FormErrorMessage>
    </FormControl>
  );
}

InputSelect.propTypes = {
  /**
   * id attribute for unique identification of the form control
   */
  id: PropTypes.string.isRequired,
  /**
   * the question
   */
  question: PropTypes.string.isRequired,
  /**
   * the options for the select button
   */
  options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  isInvalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  optional: PropTypes.bool.isRequired,
  register: PropTypes.func,
  /**
   * the text that appears above the select box
   */
  label: PropTypes.string,
  /**
   * the placeholder text for the select box
   */
  placeholder: PropTypes.string,
  /**
   * Custom validation function
   */
  errormessage: PropTypes.string,
  helpText: PropTypes.string,
};

InputSelect.defaultProps = {
  isInvalid: false,
  optional: false,
};