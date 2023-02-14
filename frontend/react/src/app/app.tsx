// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import AppBar from './appbar/appbar';
import User from './user/user';
import { Container } from 'react-bootstrap';
import { AuthenticationProvider  } from './provider'

export function App() {
  return (
    <AuthenticationProvider>
      <AppBar></AppBar>
      <Container>
        <User></User>
      </Container>
    </AuthenticationProvider>
  );
}

export default App;
