import { memo, FC, ChangeEvent } from "react";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

type Props = {
  email: string;
  onChangeEmail: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const EmailForm: FC<Props> = memo((props) => {
  const {email, onChangeEmail} = props;

  const isEmailError = email === ''

  return (
    <FormControl isRequired isInvalid={isEmailError}>
      <FormLabel>メールアドレス</FormLabel>
      <Input
        type="email"
        value={email}
        onChange={(e) => onChangeEmail(e)}
      />
      {isEmailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
    </FormControl>
  );
});
