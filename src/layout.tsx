import { SideBar } from '@components/layout/side-bar';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
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
