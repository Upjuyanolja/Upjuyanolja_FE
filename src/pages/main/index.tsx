import { MainChart } from '@components/main/main-chart';
import { MainCouponStatusContainer } from '@components/main/main-coupon-status-container';
import { CouponRegistrationContainer } from '@components/main/coupon-navigation-container';
import promotionImage from '@assets/image/mainPromotionImage.jpg';
import { Image, Layout, Spin } from 'antd';
import styled from 'styled-components';
import { useMain } from '@hooks/main/useMain';
import { UserGuidNavigationContainer } from '@components/main/user-guide-navigation-container';

export const Main = () => {
  const {
    navigateCoupon,
    navigateCouponRegistration,
    staticsData,
    isStaticsError,
    revenueData,
    isRevenueError,
    couponMessage,
    navigateUserGuide,
    navigateBusinessCenter,
  } = useMain();

  if (!staticsData || !revenueData)
    return (
      <StyledLoadingLayout>
        <Spin tip="Loading..." size="large" />
      </StyledLoadingLayout>
    );
  if (isStaticsError || isRevenueError) return <div>에러</div>;
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
