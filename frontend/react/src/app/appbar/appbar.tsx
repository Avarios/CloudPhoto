import { Navbar, Container } from 'react-bootstrap';


export function AppBar() {
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
