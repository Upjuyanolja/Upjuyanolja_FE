import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <Layout>
      <Layout.Header>Header</Layout.Header>
      <Layout>
        <Layout.Sider
          style={{
            backgroundColor: 'blue',
            height: '100vh',
          }}
        >
          Sider
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
