import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <Layout
      style={{
        maxWidth: '1280px',
        minHeight: '100vh',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Outlet />
    </Layout>
  );
};
