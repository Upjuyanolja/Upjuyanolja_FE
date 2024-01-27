import { Card, Col, Row, Button, Space, Tag, Image } from 'antd';
import COUPON from '@assets/image/coupon.svg';
import { TextBox } from '@components/text-box';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { KoreanOptionNamesType, RoomCardProps } from './type';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { ImageCarousel } from '@components/init/init-info-confirmation/ImageCarousel';

const RoomCard = ({ data, handleDeleteRoom }: RoomCardProps) => {
  const navigate = useNavigate();
  const { accommodationId } = useParams();

  const handleEditClick = (roomId: number) => {
    navigate(`/${accommodationId}/${roomId}${ROUTES.ROOM_UPDATE}`);
  };

  const handleDeleteClick = (roomId: number) => {
    handleDeleteRoom(roomId);
  };

  const renderOptionTags = () => {
    return Object.entries(data.option)
      .filter(([, value]) => value)
      .map(([key]) => (
        <StyledOptionTag key={key}>
          <TextBox typography="body4" color="black900" fontWeight="normal">
            {getKoreanOptionNames(key)}
          </TextBox>
        </StyledOptionTag>
      ));
  };

  const koreanOptionsNames: KoreanOptionNamesType = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };

  const getKoreanOptionNames = (key: string): string => {
    return koreanOptionsNames[key] || key;
  };

  return (
    <StyledCardContainer isOnSale={data.status === 'SELLING'}>
      <StyledContentContainer wrap={false}>
        <StyledImageContainer>
          <StyledCouponImage
            hasCoupon={data.coupons.length > 0}
            src={COUPON}
            alt="Coupon"
          />
          <StyledRoomImageCarousel images={data.images} />
          <StyledSaleBanner isOnSale={data.status === 'SELLING'}>
            {data.status === 'SELLING' ? '판매중' : '판매중지'}
          </StyledSaleBanner>
        </StyledImageContainer>
        <StyledDetailsCol>
          <TextBox typography="h4" color="black900" fontWeight="bold">
            {data.name}
          </TextBox>
          <StyledDetailsSpace direction="vertical">
            <StyledTags>{renderOptionTags()}</StyledTags>
            <StyledCenterVertically>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7 14C7 14 6 14 6 13C6 12 7 9 11 9C15 9 16 12 16 13C16 14 15 14 15 14H7ZM11 8C11.7956 8 12.5587 7.68393 13.1213 7.12132C13.6839 6.55871 14 5.79565 14 5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2C10.2044 2 9.44129 2.31607 8.87868 2.87868C8.31607 3.44129 8 4.20435 8 5C8 5.79565 8.31607 6.55871 8.87868 7.12132C9.44129 7.68393 10.2044 8 11 8ZM5.216 14C5.06776 13.6878 4.99382 13.3455 5 13C5 11.645 5.68 10.25 6.936 9.28C6.30909 9.08684 5.65595 8.99237 5 9C1 9 0 12 0 13C0 14 1 14 1 14H5.216ZM4.5 8C5.16304 8 5.79893 7.73661 6.26777 7.26777C6.73661 6.79893 7 6.16304 7 5.5C7 4.83696 6.73661 4.20107 6.26777 3.73223C5.79893 3.26339 5.16304 3 4.5 3C3.83696 3 3.20107 3.26339 2.73223 3.73223C2.26339 4.20107 2 4.83696 2 5.5C2 6.16304 2.26339 6.79893 2.73223 7.26777C3.20107 7.73661 3.83696 8 4.5 8Z"
                  fill="black"
                />
              </svg>
              <TextBox typography="body3" color="black900" fontWeight="normal">
                기준 {data.defaultCapacity}일 / 최대 {data.maxCapacity}인
              </TextBox>
            </StyledCenterVertically>
            <TextBox typography="body3" color="black900" fontWeight="normal">
              체크인 {data.checkInTime} / 체크아웃 {data.checkOutTime}
            </TextBox>
          </StyledDetailsSpace>
        </StyledDetailsCol>
        <StyledRightContent>
          <StyledEditDeleteContainer>
            <StyledEditDeleteButtons
              onClick={() => handleEditClick(data.id)}
              style={{
                marginRight: '8px',
              }}
            >
              <EditOutlined
                style={{
                  fontSize: '20px',
                  color: colors.black700,
                  marginTop: 2,
                }}
              />
              <TextBox typography="body3" color="black700" fontWeight="bold">
                수정
              </TextBox>
            </StyledEditDeleteButtons>
            <StyledEditDeleteButtons onClick={() => handleDeleteClick(data.id)}>
              <DeleteOutlined
                style={{
                  fontSize: '18px',
                  color: colors.black700,
                  marginTop: 2,
                }}
              />
              <TextBox typography="body3" color="black700" fontWeight="bold">
                삭제
              </TextBox>
            </StyledEditDeleteButtons>
          </StyledEditDeleteContainer>
          <StyledNumRoomPriceContainer>
            <TextBox typography="body3" color="black900" fontWeight="normal">
              객실 수 : {data.amount}개
            </TextBox>
            <TextBox typography="h5" color="black900" fontWeight="bold">
              {data.basePrice?.toLocaleString()}원
            </TextBox>
          </StyledNumRoomPriceContainer>
        </StyledRightContent>
      </StyledContentContainer>
    </StyledCardContainer>
  );
};

export default RoomCard;

const StyledCardContainer = styled(Card)<{ isOnSale: boolean }>`
  height: 176px;
  padding: 0px;
  border-radius: 8px;
  border: 2px solid
    ${({ isOnSale }) => (isOnSale ? colors.primary : colors.black600)};
  background: ${colors.white};
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
  margin: 0px;
  max-width: 100%;
  &:hover {
    transform: scale(1);
  }

  .ant-card-body {
    padding: 16px !important;
  }
`;

const StyledContentContainer = styled(Row)`
  height: 144px;
  padding: 0px;
  display: flex;
  align-items: start;
  wrap: false;
`;

const StyledImageContainer = styled(Col)`
  border-radius: 8px;
  position: relative;
  margin-bottom: 20px !important;
  display: flex;
  align-items: start;
`;

const StyledCouponImage = styled(Image)<{ hasCoupon: boolean }>`
  position: absolute;
  top: -4px;
  left: -4px;
  width: 39.636px;
  height: 31.143px;
  z-index: 3;

  display: ${({ hasCoupon }) => (hasCoupon ? 'block' : 'none')};
`;

const StyledRoomImageCarousel = styled(ImageCarousel)`
  width: 224px;
  height: 144px;
  object-fit: cover;
  z-index: 1;

  .ant-carousel .slick-slide img {
    margin-bottom: 0px !important;
  }
`;

const StyledSaleBanner = styled.div<{ isOnSale: boolean }>`
  position: absolute;
  height: 24px;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: ${({ isOnSale }) =>
    isOnSale ? colors.primary : colors.black600};
  color: white;
  text-align: center;
  z-index: 3;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const StyledDetailsCol = styled(Col).attrs({
  flex: 'auto',
})`
  margin-left: 16px;
  height: 144px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledDetailsSpace = styled(Space)`
  gap: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 0px;
`;

const StyledOptionTag = styled(Tag)`
  border: 1px solid ${colors.black700};
  background-color: ${colors.white};
  width: 56px;
  height: 22px;
  border-radius: 2px;
  padding: 2px 6px;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledRightContent = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 144px;
`;

const StyledEditDeleteContainer = styled(Col)`
  display: flex;
  padding: 2px 4px;
  align-items: center;
  gap: 8px;
`;

const StyledNumRoomPriceContainer = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledCenterVertically = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledEditDeleteButtons = styled(Button)`
  width: 60px;
  height: 28px;
  border-radius: 2px;
  border-color: transparent;
  background: ${colors.midGray};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 2px 4px;

  .anticon + span {
    margin-left: 2px;
  }

  &:hover,
  &:focus {
    background: ${colors.midGray};
    border-color: transparent;
  }
`;

const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;
