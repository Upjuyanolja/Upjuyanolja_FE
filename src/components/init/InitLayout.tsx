import { ROUTES } from '@/constants/routes';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

export const InitLayout = () => {
  const location = useLocation();

  const routeConfig: Record<string, { pageName: string; pageDesc: string }> = {
    [ROUTES.INIT_ACCOMMODATION_REGISTRATION]: {
      pageName: '숙소 등록하기',
      pageDesc: '숙소 정보를 알려주세요.',
    },
    [ROUTES.INIT_ROOM_REGISTRATION]: {
      pageName: '객실 등록하기',
      pageDesc: '객실 정보를 알려주세요.',
    },
    [ROUTES.INIT_INFO_CONFIRMATION]: {
      pageName: '등록 정보 확인하기',
      pageDesc: '등록한 정보를 확인해 주세요.',
    },
  };

  const currentRoute = Object.keys(routeConfig).find(
    (route) => location.pathname === route,
  );

  const { pageName = '숙소 등록하기', pageDesc = '숙소 정보를 알려주세요.' } =
    routeConfig[currentRoute as keyof typeof routeConfig] || {};

  return (
    <Layout>
      <Layout.Header>Header</Layout.Header>
      <StyledHeadContent>
        <StyledTextWrapper>
          <StyledPageName>{pageName}</StyledPageName>
          <StyledPageDesc>{pageDesc}</StyledPageDesc>
        </StyledTextWrapper>
      </StyledHeadContent>
      <StyledMainContent>
        <Outlet />
      </StyledMainContent>
    </Layout>
  );
};

const StyledHeadContent = styled(Layout.Content)`
  height: 140px;
  width: 100%;

  background-color: white;

  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 67px;
`;

const StyledPageName = styled.h1`
  font-size: 36px;
  color: #0351ff;
  font-weight: 700;

  margin: 0;
`;

const StyledPageDesc = styled.p`
  font-size: 24px;
  font-weight: 400;

  margin: 0;
`;

const StyledMainContent = styled(Layout.Content)`
  max-width: 1024px;
  width: 1024px;

  margin: 40px auto;
`;
