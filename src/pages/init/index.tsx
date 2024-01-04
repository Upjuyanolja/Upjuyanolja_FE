import { Layout, Typography, Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { MdOutlineAddHome } from 'react-icons/md';
import './init.module.scss';

export const Init = () => {
  const { Title } = Typography;
  const name = '신현진';

  return (
    <Layout
      style={{
        height: '100vh',
        backgroundColor: 'white',
      }}
    >
      <Layout.Header>Header</Layout.Header>
      <Content
        style={{
          width: '1024px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div className="main-content">
          <Title level={2} style={{ fontSize: '36px' }}>
            반갑습니다, {name}님!
          </Title>
          <Button
            ghost
            type="primary"
            style={{
              width: '784px',
              height: '72px',
              fontSize: '24px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
            href="/init/accommodation-registration"
          >
            <MdOutlineAddHome size={32} />
            숙소 등록 시작하기
          </Button>
        </div>
      </Content>
    </Layout>
  );
};
