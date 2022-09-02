import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Flex
} from '@chakra-ui/react';
import HelpText from '@/components/Guidance/HelpText';

export function InputNumber({
  id,
  question,
  isInvalid,
  optional,
  register,
  label,
  minVal,
  maxVal,
  precision,
  errormessage,
  helpText,
  validate
}) {
  const validation = {
    valueAsNumber: true,
    ...{ required: { value: !optional, message: "Required" } },
    ...(minVal && {
      min: {
        value: minVal,
        message: `min value of ${minVal} exceeded.`,
      },
    }),
    ...(maxVal && {
      max: {
        value: maxVal,
        message: `max value of ${maxVal} exceeded.`,
      },
    }),
    ...(validate && { validate: validate }),
  };

  // console.log("form value: ", props.id, "validation: ", validation);

  return (
    <FormControl
      p={4}
      id={id}
      isInvalid={isInvalid}
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
      <NumberInput precision={precision}>
        <NumberInputField {...register(id, validation)} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormErrorMessage>{errormessage}</FormErrorMessage>
    </FormControl>
  );
}