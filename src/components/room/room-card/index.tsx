import { Card, Col, Row, Typography, Button, Space, Tag, Image } from 'antd';
import COUPON from '../../../assets/image/coupon.svg';
import { TextBox } from '@components/text-box';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

export const RoomCard = () => {
  return (
    <CardContainer hoverable>
      <StyledRow wrap={false}>
        <ImageContainer>
          <StyledImage src={COUPON} alt="Coupon" />
          <StyledImageMain src="https://github.com/Upjuyanolja/Upjuyanolja_FE/assets/57075876/f478c693-df9b-47a4-b4c2-e3724c22f79b" />
          <SaleBanner>판매중</SaleBanner>
        </ImageContainer>
        <DetailsCol>
          <TextBox typography="h4" color="black900" fontWeight="bold">
            스탠다드 트윈룸
          </TextBox>
          <FeaturesSpace direction="vertical">
            <Tags>
              <FeatureTag>
                <TextBox
                  typography="body4"
                  color="black900"
                  fontWeight="normal"
                >
                  TV
                </TextBox>
              </FeatureTag>
              <FeatureTag>
                <TextBox
                  typography="body4"
                  color="black900"
                  fontWeight="normal"
                >
                  에어컨
                </TextBox>
              </FeatureTag>
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
          </FeaturesSpace>
        </DetailsCol>
        <ActionsCol>
          <Col
            style={{
              display: 'flex',
              padding: '2px 4px',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <EditDeleteButtons
              style={{
                marginRight: '4px',
              }}
            >
              <EditOutlined style={{ fontSize: '20px', color: '#5C656C' }} />
              <TextBox typography="body2" color="black700" fontWeight="bold">
                수정
              </TextBox>
            </EditDeleteButtons>
            <EditDeleteButtons>
              <DeleteOutlined
                style={{ fontSize: '20px', color: '#5C656C', marginTop: 2 }}
              />
              <TextBox typography="body2" color="black700" fontWeight="bold">
                삭제
              </TextBox>
            </EditDeleteButtons>
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
        </ActionsCol>
      </StyledRow>
    </CardContainer>
  );
};

const CardContainer = styled(Card)`
  border-radius: 8px;
  border: 2px solid var(--Foundation-Blue-Normal, #0351ff);
  background: var(--white, #fff);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
  margin: 0px;
  max-width: 100%;
`;

const StyledRow = styled(Row)`
  /* Add any additional styles if needed */
`;

const ImageContainer = styled(Col).attrs({
  flex: '224px',
})`
  position: relative;
  height: 144px;
`;

const StyledImage = styled(Image)`
  position: absolute;
  bottom: 50px;
  left: -8px;
  width: 39.636px;
  height: 31.143px;
  z-index: 2;
`;

const StyledImageMain = styled(Image)`
  width: 224px;
  height: 144px;
  border-radius: 8px;
  z-index: 1;
`;

const SaleBanner = styled.div`
  position: absolute;
  height: 24px;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: blue;
  color: white;
  text-align: center;
  z-index: 3;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const DetailsCol = styled(Col).attrs({
  flex: 'auto',
})`
  margin-left: 16px;
  height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FeaturesSpace = styled(Space)`
  gap: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 0px;
`;

const FeatureTag = styled(Tag)`
  border: 1px solid #9199a4;
  background-color: #ffffff;
  width: 56px;
  height: 22px;
  border-radius: 2px;
  padding: 2px 6px;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ActionsCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 144px;
`;

const CenterVertically = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EditDeleteButtons = styled(Button)`
  width: 60px;
  height: 28px;
  border-radius: 2px;
  border-color: transparent;
  background: var(--Mid-Gray, #f1f1f6);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
  flex-direction: row;
  padding: 2px 4px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;
