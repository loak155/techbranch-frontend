import { memo, FC, ChangeEvent } from "react";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

type Props = {
  username: string;
  onChangeUsername: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const UsernameForm: FC<Props> = memo((props) => {
  const {username, onChangeUsername} = props;

  const isUsernameError = username === ''

  return (
    <FormControl isRequired isInvalid={isUsernameError}>
      <FormLabel>ユーザ名</FormLabel>
      <Input
        type="text"
        value={username}
        onChange={(e) => onChangeUsername(e)}
      />
      {isUsernameError && <FormErrorMessage>Username is required.</FormErrorMessage>}
    </FormControl>
  );
});
