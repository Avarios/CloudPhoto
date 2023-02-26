import { Button, Navbar } from 'react-bootstrap';

type UserMenuProps = {
  username?: string;
};

export function UserMenu({ username }: UserMenuProps) {
  if (username) {
    return (
      <Navbar.Text>
        signed in as: <a href="#login">{username}</a>
      </Navbar.Text>
    );
  } else {
    return <Button> Login </Button>
  }
}
