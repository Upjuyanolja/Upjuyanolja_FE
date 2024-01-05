import { RoomForSale } from '../../components/room/room-for-sale';
import { Card, Col, Typography, Button, Row, Space, Image } from 'antd';

const Room = () => {
  const { Title } = Typography;
  return (
    <Card
      bodyStyle={{ padding: 0 }}
      style={{ padding: '16px 48px 16px 48px', border: 'none' }}
    >
      <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Title level={4}>객실 관리</Title>
        <Button
          type="primary"
          style={{
            borderRadius: '2px',
            background: 'var(--Foundation-Blue-Normal, #0351FF)',
          }}
        >
          + 객실추가
        </Button>
      </Row>
      <RoomForSale />
    </Card>
  );
};

export default Room;
