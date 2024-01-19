import { colors } from '@/constants/colors';
import { ROUTES } from '@/constants/routes';
import { TextBox } from '@components/text-box';
import { Outlet, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { RouteConfigProps } from './type';
import { RightOutlined } from '@ant-design/icons';

export const RoomLayout = () => {
  const location = useLocation();

  const routeConfig: RouteConfigProps = {
    [ROUTES.ROOM_REGISTRATION]: {
      pageName: '객실 추가 등록',
      pageTitle: '객실 추가 등록',
    },
    [ROUTES.ROOM_UPDATE]: {
      pageName: '객실 수정',
      pageTitle: '객실 수정',
    },
  };

  const currentRouteKey = Object.keys(routeConfig).find((routeKey) =>
    location.pathname.includes(routeKey),
  );

  const currentRouteConfig =
    routeConfig[currentRouteKey as keyof typeof routeConfig];

  const pageTitle = currentRouteConfig
    ? currentRouteConfig.pageTitle
    : '객실 추가 등록';

  return (
    <StyledFullContainer
      style={{
        background: colors.midGray,
      }}
    >
      <StyledHeaderContainer>
        <TextBox typography="h4" fontWeight={700}>
          객실 관리
        </TextBox>
        <RightOutlined />
        <TextBox typography="h4" fontWeight={700}>
          {pageTitle}
        </TextBox>
      </StyledHeaderContainer>
      <StyledContentArea>
        <Outlet />
      </StyledContentArea>
    </StyledFullContainer>
  );
};

const StyledFullContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background-color: ${colors.midGray};
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 32px 48px 16px 48px;
  gap: 8px;
  align-items: center;
  background-color: ${colors.midGray};
  box-sizing: border-box;
`;

const StyledContentArea = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background-color: ${colors.midGray};
  padding: 0px 48px 32px 48px;
  box-sizing: border-box;
`;
