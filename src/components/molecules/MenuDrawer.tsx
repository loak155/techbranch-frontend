import { FC, memo } from "react";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/react";

import { useLoginUser } from "../../hooks/providers/useLoginUserProvider";
import { useCookies } from "react-cookie";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickHome: () => void;
  onClickBookmark: () => void;
  onClickSignup: () => void;
  onClickLogin: () => void;
  onClickLogout: () => void;
};

export const MenuDrawer: FC<Props> = memo((props) => {
  const { isOpen, onClose, onClickHome, onClickBookmark, onClickSignup, onClickLogin, onClickLogout} = props;

  const { loginUser } = useLoginUser();
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody as="nav" p={0} bg="gray.100">
            <Button w="100%" onClick={onClickHome}>
              トップ
            </Button>

            {loginUser?.id ?
              <>
                <Button w="100%" onClick={onClickBookmark}>
                  ブックマーク
                </Button>
                <Button w="100%" onClick={onClickLogout}>
                  ログアウト
                </Button>
              </>
              :
              <>
                <Button w="100%" onClick={onClickSignup}>
                  サインアップ
                </Button>
                <Button w="100%" onClick={onClickLogin}>
                  ログイン
                </Button>
              </>
            }
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
