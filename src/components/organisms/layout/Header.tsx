import { memo, useCallback, FC, useEffect } from "react";
import { Box, Flex, Heading, Link, Spacer, useDisclosure } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useLoginUser } from "../../../hooks/providers/useLoginUserProvider";
import { useLogout } from "../../../hooks/useLogout";
import { useGetLoginUser } from "../../../hooks/useGetLoginUser";
import { useCookies } from "react-cookie";

export const Header: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginUser, setLoginUser } = useLoginUser();
  const { logout, loading } = useLogout();
  const { getLoginUser, user } = useGetLoginUser();
  const [cookies, setCookie, removeCookie] = useCookies();

  const history = useHistory();

  const onClickHome = useCallback(() => history.push("/"), []);
  const onClickBookmark = useCallback(() => history.push("/bookmark"), []);
  const onClickSignup = useCallback(() => history.push("/signup"), []);
  const onClickLogin = useCallback(() => history.push("/login"), []);
  const onClickLogout = () => {
    logout();
  };

  useEffect(() => {
    if (cookies.accessToken) {
      getLoginUser();
    }
  }, [getLoginUser, cookies.accessToken]);

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            TechBranch
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
        >
          <Box pr={4}>
            <Link onClick={onClickHome}>Home</Link>
          </Box>
          {loginUser ?
          <Box pr={4}>
            <Link onClick={onClickBookmark}>Bookmark</Link>
          </Box>
          :
          <></>
          }
        </Flex>
        <Spacer />
        <Flex
          align="center"
          fontSize="sm"
          display={{ base: "none", md: "flex" }}
        >
          {loginUser ?
            <>
              <Box pr={4}>
                <Link onClick={onClickLogout}>ログアウト</Link>
              </Box>
              <Box pr={4}>
                {loginUser.username}
              </Box>
            </>
            :
            <>
              <Box pr={4}>
                <Link onClick={onClickSignup}>サインアップ</Link>
              </Box>
              <Box pr={4}>
                <Link onClick={onClickLogin}>ログイン</Link>
              </Box>
            </>
          }
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickHome={onClickHome}
        onClickBookmark={onClickBookmark}
        onClickSignup={onClickSignup}
        onClickLogin={onClickLogin}
        onClickLogout={onClickLogout}
      />
    </>
  );
});
