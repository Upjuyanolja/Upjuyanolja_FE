import { SideBar } from '@components/layout/side-bar';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from './constants/routes';

export const RootLayout = () => {
  /*  const location = useLocation();
  const currentRoute = location.pathname;

style={{
  background-color:
  currentRoute === ROUTES.ROOM_REGISTRATION ? ${colors.midGray} : 'white',
  }} 디자이너 분과 상의 후 삭제 및 추가
*/

  return (
    <Layout>
      <Layout.Header>Header</Layout.Header>
      <Layout>
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
