// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import AppBar from './components/appbar/appbar';
import { Login } from './components/authentication';
import { Container } from 'react-bootstrap';
import { AuthenticationProvider  } from './provider'

export function App() {
  return (
    <AuthenticationProvider>
      <AppBar></AppBar>
      <Container>
        <Login></Login>
      </Container>
    </AuthenticationProvider>
  );
}

export default App;
