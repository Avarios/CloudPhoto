// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import AppBar from './appbar/appbar';
import User from './user/user';
import { UserStateProvider } from './common/UserProvider';
import { Container } from 'react-bootstrap';
import { Authentication } from './authentication/authentication';

export function App() {
  return (
    <UserStateProvider>
      <AppBar></AppBar>
      <Container>
        <User></User>
        <Authentication></Authentication>
      </Container>
    </UserStateProvider>
  );
}

export default App;
