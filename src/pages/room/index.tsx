import { RoomForSale } from '../../components/room/room-for-sale';
import { Card, Button, Row } from 'antd';
import { TextBox } from '@components/text-box';

const Room = () => {
  return (
    <Card
      bodyStyle={{ padding: 0 }}
      style={{ padding: '16px 48px 16px 48px', border: 'none' }}
    >
      <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <TextBox typography="h4" color={'black900'} fontWeight={700}>
          객실 관리
        </TextBox>
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
