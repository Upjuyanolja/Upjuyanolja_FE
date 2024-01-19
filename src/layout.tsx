import { SideBar } from '@components/layout/side-bar';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { colors } from '@/constants/colors';

export const RootLayout = () => {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <Layout>
      <Layout.Header style={{ height: '56px' }}>Header</Layout.Header>
      <Layout
        style={{
          backgroundColor:
            currentRoute === ROUTES.ROOM_REGISTRATION
              ? colors.midGray
              : 'white',
        }}
      >
        <Layout.Sider width="256" theme={'light'}>
          <SideBar />
        </Layout.Sider>
        <Layout.Content
          style={{
            maxWidth: '1024px',
            margin: '0 auto',
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
