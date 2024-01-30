import { MainChart } from '@components/domain/main/main-chart';
import { MainCouponStatusContainer } from '@components/domain/main/main-coupon-status-container';
import { CouponRegistrationContainer } from '@components/domain/main/coupon-navigation-container';
import promotionImage from '@assets/image/mainPromotionImage.jpg';
import { Image, Layout, Spin } from 'antd';
import styled from 'styled-components';
import { useMain } from '@hooks/main/useMain';
import { UserGuidNavigationContainer } from '@components/domain/main/user-guide-navigation-container';
import { RESPONSE_CODE } from '@/constants/api';
import { NotFound } from '@components/error/NotFound';
import { ServerError } from '@components/error/ServerError';

export const Main = () => {
  const {
    navigateCoupon,
    navigateCouponRegistration,
    staticsData,
    staticsError,
    revenueData,
    revenueError,
    isStaticsLoading,
    isRevenueLoading,
    couponMessage,
    navigateUserGuide,
    navigateBusinessCenter,
  } = useMain();

  if (
    staticsError?.response?.data.code ===
      RESPONSE_CODE.NOT_ACCOMMODATION_OWNER ||
    revenueError?.response?.data.code === RESPONSE_CODE.NOT_ACCOMMODATION_OWNER
  )
    return <NotFound />;
  if (staticsError !== null || revenueError !== null) return <ServerError />;
  if (isStaticsLoading || isRevenueLoading)
    return (
      <StyledLoadingLayout>
        <Spin tip="Loading..." size="large" />
      </StyledLoadingLayout>
    );
  if (staticsData === undefined || revenueData === undefined) return <></>;
  return (
    <StyledMainLayout>
      <StyledLayout>
        <StyledMainContainer>
          <MainCouponStatusContainer
            staticsData={staticsData}
            navigateCoupon={navigateCoupon}
          />
          <MainChart revenueData={revenueData} couponMessage={couponMessage} />
        </StyledMainContainer>
        <StyledMainInfo>
          <CouponRegistrationContainer
            navigateCouponRegistration={navigateCouponRegistration}
          />
          <UserGuidNavigationContainer navigateUserGuide={navigateUserGuide} />
          <StyledImage
            src={promotionImage}
            preview={false}
            onClick={navigateBusinessCenter}
          />
        </StyledMainInfo>
      </StyledLayout>
    </StyledMainLayout>
  );
};

const StyledLoadingLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;
const StyledMainLayout = styled(Layout)`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledLayout = styled('div')`
  display: flex;
  flex-direction: row;

  gap: 12px;
`;

const StyledMainContainer = styled('div')`
  width: 692px;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const StyledMainInfo = styled('div')`
  width: 224px;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const StyledImage = styled(Image)`
  width: 224px;
  height: 185px;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }
`;
