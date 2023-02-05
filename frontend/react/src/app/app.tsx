// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import AppBar from './appbar/appbar';
import User from './user/user';
import { UserStateProvider } from './common/UserProvider';

export function App() {
  return (
    <UserStateProvider>
      <AppBar></AppBar>
      <User></User>
    </UserStateProvider>
  );
}

export default App;
