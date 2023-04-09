import {
  Flex,
  Menu,
  Text,
  MenuButton,
  useAuthenticator,
  Button,
  MenuItem,
} from '@aws-amplify/ui-react';
import camera from '../../images/kamera.png';
import { FaUser } from 'react-icons/fa'
import './appbar.css';

export function TopBar() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  return (
    <Flex id="appbar" justifyContent={'flex-start'} direction={'row'}>
      <img id="appbarImage" src={camera} alt="Camera" />
      <Text id="appbarProducttext" flex={'auto'}>
        Cloud Photo
      </Text>
      {user && (
        <Menu
          size="small"
          menuAlign="end"
          trigger={
            <MenuButton variation="menu" size="small" width="">
              <FaUser></FaUser>
            </MenuButton>
          }
        >
            <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </Menu>
      )}
      {!user && (
        <>
          <Button> Register </Button>
          <Button> Login</Button>
        </>
      )}
    </Flex>
  );
}
