import { SideBar } from '@components/layout/side-bar';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { colors } from '@/constants/colors';

export const RootLayout = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const isRoomRegistrationRoute = currentRoute.includes(
    ROUTES.ROOM_REGISTRATION,
  );

  return (
    <Layout>
      <Layout.Header>Header</Layout.Header>
      <Layout
        style={{
          backgroundColor: isRoomRegistrationRoute ? colors.midGray : 'white',
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
