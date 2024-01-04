import { Card, Col, Row, Typography, Button, Tag, Space, Image } from 'antd';
import 'antd/dist/antd.css';
import COUPON from '../../../assets/coupon.svg';

import styled from 'styled-components';

const { Title, Text } = Typography; //이 부분 나중에 수정 예정

export const RoomForSale = () => {
  return (
    <Card
      hoverable
      style={{
        borderRadius: '8px',
        border: '2px solid var(--Foundation-Blue-Normal, #0351FF)',
        background: 'var(--white, #FFF)',
        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.10)',
      }}
    >
      <Row gutter={[16, 16]} wrap={false}>
        <Col flex="224px" style={{ height: '144px' }}>
          <COUPON></COUPON>
          <Image
            width={224}
            height={144}
            style={{ borderRadius: 8 }}
            src="https://github.com/Upjuyanolja/Upjuyanolja_FE/assets/57075876/f478c693-df9b-47a4-b4c2-e3724c22f79b"
          />
        </Col>
        <Col
          flex="auto"
          style={{
            marginLeft: '24px',
            height: '144px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Title level={4}>스탠다드 트윈룸</Title>
          <Space
            direction="vertical"
            style={{
              gap: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              marginBottom: '0px',
            }}
          >
            <Tags>
              <Tag
                style={{
                  border: '1px solid #9199A4',
                  backgroundColor: '#ffffff',
                  width: '56px',
                  height: '22px',
                  borderRadius: '2px',
                  padding: '2px 6px',
                  margin: '0px 0px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                TV
              </Tag>
              <Tag
                style={{
                  border: '1px solid #9199A4',
                  backgroundColor: '#ffffff',
                  width: '56px',
                  height: '22px',
                  borderRadius: '2px',
                  padding: '2px 6px',
                  margin: '0px 0px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                에어컨
              </Tag>
            </Tags>
            <CenterVertically>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7 14C7 14 6 14 6 13C6 12 7 9 11 9C15 9 16 12 16 13C16 14 15 14 15 14H7ZM11 8C11.7956 8 12.5587 7.68393 13.1213 7.12132C13.6839 6.55871 14 5.79565 14 5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2C10.2044 2 9.44129 2.31607 8.87868 2.87868C8.31607 3.44129 8 4.20435 8 5C8 5.79565 8.31607 6.55871 8.87868 7.12132C9.44129 7.68393 10.2044 8 11 8ZM5.216 14C5.06776 13.6878 4.99382 13.3455 5 13C5 11.645 5.68 10.25 6.936 9.28C6.30909 9.08684 5.65595 8.99237 5 9C1 9 0 12 0 13C0 14 1 14 1 14H5.216ZM4.5 8C5.16304 8 5.79893 7.73661 6.26777 7.26777C6.73661 6.79893 7 6.16304 7 5.5C7 4.83696 6.73661 4.20107 6.26777 3.73223C5.79893 3.26339 5.16304 3 4.5 3C3.83696 3 3.20107 3.26339 2.73223 3.73223C2.26339 4.20107 2 4.83696 2 5.5C2 6.16304 2.26339 6.79893 2.73223 7.26777C3.20107 7.73661 3.83696 8 4.5 8Z"
                  fill="black"
                />
              </svg>
              <Text>기준 2일 / 최대 4인</Text>
            </CenterVertically>
            <Text>체크인 15:00 / 체크아웃 11:00</Text>
          </Space>
        </Col>
        <Col
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '144px',
          }}
        >
          <Col
            style={{
              display: 'flex',
              padding: '2px 4px',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Button
              style={{
                width: '60px',
                height: '28px',
                borderRadius: '2px',
                borderColor: 'transparent',
                background: ' var(--Mid-Gray, #F1F1F6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.10)',
                flexDirection: 'row',
                padding: '2px 4px',
                marginRight: '8px',
              }}
            >
              <svg
                style={{
                  marginRight: '4px',
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.32255 15.356C4.36719 15.356 4.41183 15.3516 4.45647 15.3449L8.21094 14.6864C8.25558 14.6775 8.29799 14.6574 8.32924 14.6239L17.7913 5.16183C17.812 5.14118 17.8284 5.11665 17.8396 5.08965C17.8508 5.06265 17.8566 5.0337 17.8566 5.00446C17.8566 4.97523 17.8508 4.94628 17.8396 4.91928C17.8284 4.89228 17.812 4.86775 17.7913 4.8471L14.0815 1.13504C14.0391 1.09263 13.9833 1.07031 13.923 1.07031C13.8627 1.07031 13.8069 1.09263 13.7645 1.13504L4.30246 10.5971C4.26897 10.6306 4.24888 10.6708 4.23996 10.7154L3.58147 14.4699C3.55976 14.5894 3.56752 14.7125 3.60408 14.8284C3.64064 14.9443 3.7049 15.0496 3.79129 15.135C3.93862 15.2779 4.12388 15.356 4.32255 15.356ZM5.82701 11.4632L13.923 3.36942L15.5592 5.00558L7.46317 13.0993L5.47879 13.4498L5.82701 11.4632ZM18.2132 17.231H1.7846C1.38951 17.231 1.07031 17.5502 1.07031 17.9453V18.7489C1.07031 18.8471 1.15067 18.9275 1.24888 18.9275H18.7489C18.8471 18.9275 18.9275 18.8471 18.9275 18.7489V17.9453C18.9275 17.5502 18.6083 17.231 18.2132 17.231Z"
                  fill="#5C656C"
                />
              </svg>
              수정
            </Button>
            <Button
              style={{
                width: '60px',
                height: '28px',
                borderRadius: '2px',
                borderColor: 'transparent',
                background: ' var(--Mid-Gray, #F1F1F6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.10)',
                flexDirection: 'row',
                padding: '2px 4px',
              }}
            >
              <svg
                style={{
                  marginRight: '4px',
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M6.60631 2.67746H6.42774C6.52595 2.67746 6.60631 2.5971 6.60631 2.49888V2.67746H13.392V2.49888C13.392 2.5971 13.4724 2.67746 13.5706 2.67746H13.392V4.2846H14.9992V2.49888C14.9992 1.71094 14.3585 1.07031 13.5706 1.07031H6.42774C5.63979 1.07031 4.99916 1.71094 4.99916 2.49888V4.2846H6.60631V2.67746ZM17.8563 4.2846H2.14202C1.74693 4.2846 1.42773 4.60379 1.42773 4.99888V5.71317C1.42773 5.81138 1.50809 5.89174 1.60631 5.89174H2.95452L3.50586 17.5658C3.54157 18.327 4.17104 18.9275 4.9322 18.9275H15.0661C15.8295 18.9275 16.4568 18.3292 16.4925 17.5658L17.0438 5.89174H18.392C18.4902 5.89174 18.5706 5.81138 18.5706 5.71317V4.99888C18.5706 4.60379 18.2514 4.2846 17.8563 4.2846ZM14.8943 17.3203H5.10407L4.5639 5.89174H15.4344L14.8943 17.3203Z"
                  fill="#5C656C"
                />
              </svg>
              삭제
            </Button>
          </Col>
          <Col
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <Text>객실 수 : 10개</Text>
            <Title level={4} style={{ margin: 0 }}>
              65,000원
            </Title>
          </Col>
        </Col>
      </Row>
    </Card>
  );
};

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const CenterVertically = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
