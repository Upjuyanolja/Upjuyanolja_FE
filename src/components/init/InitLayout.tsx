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
    <StyledLayout color={colors.midGray}>
      <Layout.Header>Header</Layout.Header>
      <StyledHeadContent color={colors.white}>
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
      <StyledMainContent>
        <Outlet />
      </StyledMainContent>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  background-color: ${(props) => props.color};
`;

const StyledHeadContent = styled(Layout.Content)`
  height: 140px;
  width: 100%;

  background-color: ${(props) => props.color};

  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 67px;
`;

const StyledMainContent = styled(Layout.Content)`
  max-width: 1024px;
  width: 1024px;

  margin: 40px auto;
`;
