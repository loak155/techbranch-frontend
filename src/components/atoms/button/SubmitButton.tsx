import { ReactNode, FC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
};

export const SubmitButton: FC<Props> = (props) => {
  const {
    children,
    isDisabled = false,
    isLoading = false,
  } = props;

  return (
    <Button
      type="submit"
      bg="teal.400"
      color="white"
      width="full"
      isDisabled={isDisabled || isLoading}
      isLoading={isLoading}
      _hover={{ opacity: 0.8 }}
    >
      {children}
    </Button>
  );
};
