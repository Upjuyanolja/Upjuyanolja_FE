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
      <Layout>
        <StyledMainContent>
          <StyledHeadContent>
            <StyledPageName>{pageName}</StyledPageName>
            <StyledPageDesc>{pageDesc}</StyledPageDesc>
          </StyledHeadContent>
          <Outlet />
        </StyledMainContent>
      </Layout>
    </Layout>
  );
};

const StyledMainContent = styled(Layout.Content)`
  max-width: 102.4rem;
  width: 102.4rem;
  margin: 0 auto;
`;

const StyledPageName = styled.h1`
  /* Your pageName styling here */
`;

const StyledPageDesc = styled.p`
  /* Your pageDesc styling here */
`;

const StyledHeadContent = styled(Layout.Content)`
  max-width: 102.4rem;
  width: 102.4rem;
  height: 14rem;
  margin: 0 auto;
`;
