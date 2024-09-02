import { memo, FC, ChangeEvent, useState } from "react";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

type Props = {
  password: string;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const PasswordForm: FC<Props> = memo((props) => {
  const {password, onChangePassword} = props;

  const isPasswordError = password === ''

  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }

  return (
    <FormControl isRequired isInvalid={isPasswordError}>
    <FormLabel>パスワード</FormLabel>
    <InputGroup>
      <Input
        type={isRevealPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => onChangePassword(e)}
      />
      <InputRightAddon p={0}>
        <Button onClick={togglePassword}>
          {isRevealPassword ?  <FaEye /> : <FaEyeSlash />}
        </Button>
      </InputRightAddon>
    </InputGroup>
    {isPasswordError && <FormErrorMessage>Password is required.</FormErrorMessage>}
    </FormControl>
  );
});
