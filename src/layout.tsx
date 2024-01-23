import { SideBar } from '@components/layout/side-bar';
import { Layout } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { colors } from '@/constants/colors';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import logoImg from '@assets/image/logo.png';
import { StyledLayoutProps, StyledSiderProps } from './types/layout';
import { FaBars } from 'react-icons/fa6';
import { useRecoilState } from 'recoil';
import { isSideBarOpenState } from '@stores/layout';
import { getCookie } from '@hooks/sign-in/useSignIn';
import { mobileBreakPoint } from './constants/mobile';

export const RootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  const isRoomRegistrationRoute = currentRoute.includes(
    ROUTES.ROOM_REGISTRATION,
  );
  const isRoomUpdateRoute = currentRoute.includes(ROUTES.ROOM_UPDATE);
  const [isOpenSideBar, setIsOpenSideBar] = useRecoilState(isSideBarOpenState);

  const shouldApplyGrayBackground =
    isRoomRegistrationRoute || isRoomUpdateRoute;

  const moveToMain = () => {
    const accommodationId = getCookie('accommodationId');
    const updatedMainPath = `/${accommodationId}${ROUTES.MAIN}`;
    navigate(updatedMainPath);
  };

  const openSideBar = () => {
    setIsOpenSideBar(true);
  };

  const closeSideBar = () => {
    setIsOpenSideBar(false);
  };

  return (
    <Layout>
      <StyledHeader>
        <StyleLogo src={logoImg} onClick={moveToMain} />
        <StyledBars onClick={openSideBar}>
          <FaBars />
        </StyledBars>
        <TextBox
          typography="h5"
          fontWeight={700}
          color="black900"
          onClick={moveToMain}
          cursor="pointer"
        >
          빨리잡아! 쿠폰센터
        </TextBox>
      </StyledHeader>
      <StyledLayout shouldApplyGrayBackground={shouldApplyGrayBackground}>
        <StyledSider width="256" theme={'light'} isOpenSideBar={isOpenSideBar}>
          <SideBar />
        </StyledSider>
        {isOpenSideBar && <StyledDim onClick={closeSideBar} />}
        <StyledContent>
          <Outlet />
        </StyledContent>
      </StyledLayout>
    </Layout>
  );
};

const StyledHeader = styled(Layout.Header)`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 56px;
  background-color: ${colors.black100};
  box-shadow: 0px 1px 5px 0px #0000001a;
  padding: 0 24px;
  z-index: 1003;
  @media (max-width: ${mobileBreakPoint}) {
    z-index: 1000;
  }
`;

const StyledSider = styled(Layout.Sider)<StyledSiderProps>`
  position: sticky;
  top: 56px;
  height: calc(100vh - 56px);
  background-color: ${colors.white};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1002;
  @media (max-width: ${mobileBreakPoint}) {
    transform: ${(props) =>
      props.isOpenSideBar ? 'translateX(0%)' : 'translateX(-100%)'};
    top: 0;
    position: fixed;
    z-index: 2001;
    height: 100%;
  }
`;

const StyleLogo = styled.img`
  height: 24px;
  object-fit: contain;
  cursor: pointer;
  @media (max-width: ${mobileBreakPoint}) {
    display: none;
  }
`;

const StyledContent = styled(Layout.Content)`
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledLayout = styled(Layout)<StyledLayoutProps>`
  background-color: ${(props) =>
    props.shouldApplyGrayBackground ? colors.midGray : 'white'};
  @media (max-width: ${mobileBreakPoint}) {
    padding: 0;
  }
`;

const StyledBars = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  font-size: 24px;
  width: 24px;
  height: 24px;
  display: none;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: ${colors.primary};
  @media (max-width: ${mobileBreakPoint}) {
    display: flex;
  }
`;

const StyledDim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1001;
  display: none;
  @media (max-width: ${mobileBreakPoint}) {
    display: block;
  }
`;
