import { MainChart } from '@components/main/main-chart';
import { MainCouponStatusContainer } from '@components/main/main-coupon-status-container';
import { MainNavigationContainer } from '@components/main/main-navigation-container';
import promotionImage from '@assets/image/mainPromotionImage.png';
import promotionImage2 from '@assets/image/mainPromotionImage2.png';
import { Image, Layout } from 'antd';
import styled from 'styled-components';
import { useMain } from '@hooks/main/useMain';

export const Main = () => {
  const {
    navigateCoupon,
    navigateCouponRegistration,
    staticsData,
    isStaticsError,
    revenueData,
    isRevenueError,
  } = useMain();

  if (!staticsData || !revenueData) return <></>;
  if (isStaticsError || isRevenueError) return <div>에러</div>;
  return (
    <StyledMainLayout>
      <StyledLayout>
        <StyledMainContainer>
          <MainCouponStatusContainer
            staticsData={staticsData}
            navigateCoupon={navigateCoupon}
          />
          <MainChart revenueData={revenueData} />
        </StyledMainContainer>
        <StyledMainInfo>
          <MainNavigationContainer
            navigateCouponRegistration={navigateCouponRegistration}
          />
          <StyledImage src={promotionImage} preview={false} />
          <StyledImage src={promotionImage2} preview={false} />
        </StyledMainInfo>
      </StyledLayout>
    </StyledMainLayout>
  );
};

const StyledMainLayout = styled(Layout)`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
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
  height: 187px;
  border-radius: 8px;
`;
