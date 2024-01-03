import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { Content, Header } from 'antd/lib/layout/layout';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <Layout
      style={{
        height: '100vh',
      }}
    >
      <Header
        style={{
          width: '100vw',
          height: '4vh',
          backgroundColor: 'lightblue',
        }}
      >
        Header
      </Header>

      <Layout
        style={{
          display: 'flex',
        }}
      >
        <Sider
          style={{
            width: '256px',
            height: '96vh',
            backgroundColor: 'lightgray',
          }}
        >
          Sider
        </Sider>
        <Content
          style={{
            maxWidth: '1024px',
            margin: '0 auto',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
