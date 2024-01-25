import { SideBar } from '@components/layout/side-bar';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { colors } from '@/constants/colors';
import styled from 'styled-components';
import { StyledLayoutProps, StyledSiderProps } from './types/layout';
import { useRecoilState } from 'recoil';
import { isSideBarOpenState } from '@stores/layout';
import { MOBILE_BREAKPOINTS } from './constants/mobile';
import { Header } from '@components/layout/header';
import { NotFound } from '@components/error/NotFound';

export const RootLayout = ({ isError = false }: { isError?: boolean }) => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const isRoomRegistrationRoute = currentRoute.includes(
    ROUTES.ROOM_REGISTRATION,
  );
  const isRoomUpdateRoute = currentRoute.includes(ROUTES.ROOM_UPDATE);
  const [isOpenSideBar, setIsOpenSideBar] = useRecoilState(isSideBarOpenState);

  const shouldApplyGrayBackground =
    isRoomRegistrationRoute || isRoomUpdateRoute;

  const closeSideBar = () => {
    setIsOpenSideBar(false);
  };

  return (
    <Layout>
      <Header />
      {isError ? (
        <NotFound />
      ) : (
        <StyledLayout shouldApplyGrayBackground={shouldApplyGrayBackground}>
          <StyledSider
            width="256"
            theme={'light'}
            isOpenSideBar={isOpenSideBar}
          >
            <SideBar />
          </StyledSider>
          {isOpenSideBar && <StyledDim onClick={closeSideBar} />}
          <StyledContent>
            <Outlet />
          </StyledContent>
        </StyledLayout>
      )}
    </Layout>
  );
};

const StyledSider = styled(Layout.Sider)<StyledSiderProps>`
  position: sticky;
  top: 56px;
  height: calc(100vh - 56px);
  background-color: ${colors.white};
  z-index: 6;
  @media (max-width: ${MOBILE_BREAKPOINTS}) {
    transform: ${(props) =>
      props.isOpenSideBar ? 'translateX(0%)' : 'translateX(-100%)'};
    top: 0;
    position: fixed;
    z-index: 8;
    height: 100%;
  }
  .ant-layout-sider-children {
    box-shadow: none;
  }
`;

const StyledContent = styled(Layout.Content)`
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledLayout = styled(Layout)<StyledLayoutProps>`
  background-color: ${(props) =>
    props.shouldApplyGrayBackground ? colors.midGray : 'white'};
  @media (max-width: ${MOBILE_BREAKPOINTS}) {
    padding: 0;
  }
`;

const StyledDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 5;
  display: none;
  @media (max-width: ${MOBILE_BREAKPOINTS}) {
    display: block;
  }
`;
