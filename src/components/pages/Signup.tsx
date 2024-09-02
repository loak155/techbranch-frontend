import { ChangeEvent, FC, FormEvent, memo, useState } from "react";
import { Box, Divider, Flex, Heading, Stack } from "@chakra-ui/react";

import { HeaderLayout } from "../templates/HeaderLayout";
import { usePreSignup } from "../../hooks/usePreSignup";
import { SubmitButton } from "../atoms/button/SubmitButton";
import { UsernameForm } from "../molecules/UsernameForm";
import { EmailForm } from "../molecules/EmailForm";
import { PasswordForm } from "../molecules/PasswordForm";

export const Signup: FC = memo(() => {
  const { presignup, loading } = usePreSignup();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    presignup(username, email, password);
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  return (
    <HeaderLayout>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            サインアップ
          </Heading>
          <Divider my={4} />
          <form onSubmit={onClickSignup}>
            <Stack spacing={6} py={4} px={10}>
              <UsernameForm
                username={username}
                onChangeUsername={onChangeUsername}
              />
              <EmailForm
                email={email}
                onChangeEmail={onChangeEmail}
              />
              <PasswordForm
                password={password}
                onChangePassword={onChangePassword}
              />
              <SubmitButton
                isDisabled={username === "" || email === "" || password === ""}
                isLoading={loading}
              >
                サインアップ
              </SubmitButton>
            </Stack>
          </form>
        </Box>
      </Flex>
    </HeaderLayout>
  );
});
