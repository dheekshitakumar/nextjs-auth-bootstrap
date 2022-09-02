import React from 'react'
import {
  useRadioGroup,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Radio,
  Text,
  Flex
} from '@chakra-ui/react'
import { useController } from 'react-hook-form'
import HelpText from "@/components/Guidance/HelpText";

export function InputRadio ({
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
    formState: { errors }
  } = useController({
    control,
    name,
    ...({
      rules: validation
    })
  })

  const answers = options.map((val) => {
    if (typeof val === 'string') {
      return {
        labeltext: val,
        value: val
      }
    } else {
      return {
        labeltext: val[0],
        value: val[1]
      }
    }
  })

  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    onChange: field.onChange,
    value: field.value
  })

  const group = getRootProps()

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
            <Text as="span" color="red">
              {" "}
              *
            </Text>
          ) : null}
        </FormLabel>
        {helpText ? <HelpText message={helpText} /> : null}
      </Flex>
      {label ? <Text>{label}</Text> : null}
      <Stack {...group}>
        {answers.map((ans) => {
          const value = ans.value;
          const labeltext = ans.labeltext;
          const radio = getRadioProps({ value: value, children: labeltext });
          return (
            <Radio id={name} {...radio} key={value}>
              {labeltext}
            </Radio>
          );
        })}
      </Stack>
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
}
