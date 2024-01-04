import { Card, Col, Row, Typography, Button, Tag, Space } from 'antd';
import {
  CheckSquareOutlined,
  ShoppingCartOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { BsPeopleFill } from 'react-icons/bs';
import styled from 'styled-components';

const { Title, Text } = Typography;

export const RoomForSale = () => {
  return (
    <Card hoverable>
      <Row gutter={16}>
        <Col span={8}>
          {/* 나중에 링크 넣기 */}
          <div
            style={{
              height: '150px',
              //background: 'url(room-image.jpg) center / cover no-repeat',
            }}
          />
        </Col>
        <Col span={16}>
          <Title level={4}>스탠다드 트윈룸</Title>
          <Space direction="vertical" size="middle">
            <Tags>
              <Tag>TV</Tag>
              <Tag>에어컨</Tag>
              <Tag>인터넷</Tag>
            </Tags>
            <CenterVertically>
              <BsPeopleFill />
              <Text>기준 2일 / 최대 4인</Text>
            </CenterVertically>

            <Text>체크인 15:00 / 체크아웃 11:00</Text>
          </Space>
          <Row justify="space-between" align="middle">
            <Col>
              <Button type="primary" icon={<CheckSquareOutlined />}>
                예약
              </Button>
            </Col>
            <Col>
              <Tag color="blue">객실 수 : 10개</Tag>
              <Title level={4}>65,000원</Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
`;

const CenterVertically = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: left;
`;
