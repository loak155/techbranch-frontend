import { ReactNode, FC } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick: () => void;
};

export const PrimaryButton: FC<Props> = (props) => {
  const {
    children,
    type = "button",
    isDisabled = false,
    isLoading = false,
    onClick,
  } = props;

  return (
    <Button
      type={type}
      bg="teal.400"
      color="white"
      width="full"
      isDisabled={isDisabled || isLoading}
      isLoading={isLoading}
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
