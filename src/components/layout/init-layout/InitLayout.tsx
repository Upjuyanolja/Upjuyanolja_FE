import { colors } from '@/constants/colors';
import { ROUTES } from '@/constants/routes';
import { TextBox } from '@components/text-box';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { RouteConfigProps } from './type';

export const InitLayout = () => {
  const location = useLocation();

  const routeConfig: RouteConfigProps = {
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
    <StyledLayout>
      <StyledHeader>Header</StyledHeader>
      <StyledHeadContentCotainer>
        <StyledHeadContent>
          <StyledTextWrapper>
            <TextBox
              typography="h2"
              color={'primary'}
              fontWeight={700}
              cursor="default"
            >
              {pageName}
            </TextBox>
            <TextBox typography="h4" cursor="default">
              {pageDesc}
            </TextBox>
          </StyledTextWrapper>
        </StyledHeadContent>
      </StyledHeadContentCotainer>
      <StyledMainContent>
        <Outlet />
      </StyledMainContent>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  background-color: ${colors.midGray};
`;

const StyledHeader = styled(Layout.Header)`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
`;

const StyledHeadContentCotainer = styled.div`
  background-color: ${colors.white};

  position: fixed;
  z-index: 10;
  width: 100%;

  margin-top: 64px;
`;

const StyledHeadContent = styled(Layout.Header)`
  height: 140px;
  width: 1024px;

  background-color: ${colors.white};

  margin: 0 auto;
  display: flex;
  align-items: center;

  padding: 0;
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 67px;
`;

const StyledMainContent = styled(Layout.Content)`
  max-width: 1024px;
  width: 1024px;
  height: 100%;
  min-height: 100vh;

  margin: 0 auto;

  padding: 32px 48px;
`;
