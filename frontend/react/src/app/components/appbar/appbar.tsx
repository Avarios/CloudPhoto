import { Navbar, Container } from 'react-bootstrap';
import { useAuthentication } from '../../hooks';
import { UserMenu } from './userMenu';

export function AppBar() {
  const { user } = useAuthentication();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://upload.wikimedia.org/wikipedia/commons/2/24/Circle-icons-image.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Cloud Photo
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <UserMenu username={user?.username}></UserMenu>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppBar;
