import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

export function HelpText({message}){
    return (
      <Popover>
        <PopoverTrigger>
          <QuestionOutlineIcon />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight={600}>More information</PopoverHeader>
          <PopoverBody>{message}</PopoverBody>
        </PopoverContent>
      </Popover>
    );
}