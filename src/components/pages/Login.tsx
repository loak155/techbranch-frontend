import { ChangeEvent, FC, FormEvent, memo, useState } from "react";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/react";

import { HeaderLayout } from "../templates/HeaderLayout";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useLogin } from "../../hooks/useLogin";
import { SubmitButton } from "../atoms/button/SubmitButton";
import { EmailForm } from "../molecules/EmailForm";
import { PasswordForm } from "../molecules/PasswordForm";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
import { GoogleLoginButton } from "../atoms/button/GoogleLoginButton";

export const Login: FC = memo(() => {
  const { login, loading } = useLogin();
  const { googleLogin } = useGoogleLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  const onClickGuestLogin = () => {
    login("test@example.com", "password");
  };

  const onClickGoogleLogin = () => {
    googleLogin();
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <HeaderLayout>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            ログイン
          </Heading>
          <Divider my={4} />
          <form onSubmit={onClickLogin}>
            <Stack spacing={6} py={4} px={10}>
              <EmailForm
                email={email}
                onChangeEmail={onChangeEmail}
              />
              <PasswordForm
                password={password}
                onChangePassword={onChangePassword}
              />
              <SubmitButton
                isDisabled={email === "" || password === ""}
                isLoading={loading}
              >
                ログイン
              </SubmitButton>
              <PrimaryButton
                type="button"
                isLoading={loading}
                onClick={onClickGuestLogin}
              >
                ゲストログイン
              </PrimaryButton>
              <GoogleLoginButton
                onClick={onClickGoogleLogin}
               />
            </Stack>
          </form>
        </Box>
      </Flex>
    </HeaderLayout>
  );
});
