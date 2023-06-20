import camera from '../../images/kamera.png';
import { FaUser } from 'react-icons/fa';
import { Menu } from 'antd';
import './appbar.css';
import { Layout } from 'antd';
import useAuth from 'src/app/hooks/useAuthentication';


export function AppBar() {
  const auth = useAuth();
  return (
    <Layout.Header id='appbar'>
    </Layout.Header>
  );
}
