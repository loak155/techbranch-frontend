import { FC, memo, useEffect } from "react";
import { Flex, Spinner } from '@chakra-ui/react'
import { useLocation } from "react-router-dom";

import { HeaderLayout } from "../templates/HeaderLayout";
import { useSignup } from "../../hooks/useSignup";

export const SignupCallback: FC = memo(() => {
  const { signup } = useSignup();

  useEffect(() => signup(token), [signup]);

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const token = query.get("token");

  return (
    <HeaderLayout>
      <Flex alignItems="center" justifyContent="center" height="100vh">
      <Spinner />
      </Flex>
    </HeaderLayout>
  );
});
