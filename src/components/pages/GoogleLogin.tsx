import { FC, memo, useEffect } from "react";
import { Flex, Spinner } from '@chakra-ui/react'
import { useLocation } from "react-router-dom";

import { HeaderLayout } from "../templates/HeaderLayout";
import { useGoogleLoginCallback } from "../../hooks/useGoogleLoginCallback";

export const GoogleLogin: FC = memo(() => {
  const { googleLoginCallback } = useGoogleLoginCallback();

  useEffect(() => googleLoginCallback(state, code), [googleLoginCallback]);

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const state = query.get("state");
  const code = query.get("code");

  return (
    <HeaderLayout>
      <Flex alignItems="center" justifyContent="center" height="100vh">
      <Spinner />
      </Flex>
    </HeaderLayout>
  );
});
