import { useState } from 'react';
import { useUserState } from '../common/UserProvider';
import { Navbar, Container } from 'react-bootstrap';


export function AppBar() {
  const { setState, state } = useUserState();
  const [username, setUserName] = useState('');
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
    </Container>
  </Navbar>
  );
}

export default AppBar;
