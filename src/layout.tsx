import { SideBar } from '@components/layout/side-bar';
import { Layout } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { colors } from '@/constants/colors';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import logoImg from '@assets/image/logo.png';
import { StyledLayoutProps } from './types/layout';
import { FaBars } from 'react-icons/fa6';

export const RootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;
  const isRoomRegistrationRoute = currentRoute.includes(
    ROUTES.ROOM_REGISTRATION,
  );
  const isRoomUpdateRoute = currentRoute.includes(ROUTES.ROOM_UPDATE);

  const shouldApplyGrayBackground =
    isRoomRegistrationRoute || isRoomUpdateRoute;

  const moveToMain = () => {
    navigate(ROUTES.MAIN);
  };

  return (
    <Layout>
      <StyledHeader>
        <StyleLogo src={logoImg} onClick={moveToMain} />
        <StyledBars>
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
        <StyledSider width="256" theme={'light'}>
          <SideBar />
        </StyledSider>
        <StyledContent>
          <Outlet />
        </StyledContent>
      </StyledLayout>
    </Layout>
  );
};

const StyledHeader = styled(Layout.Header)`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100vw;
  height: 56px;
  background-color: ${colors.black100};
  box-shadow: 0px 1px 5px 0px #0000001a;
  padding: 0 24px;
  z-index: 1001;
`;

const StyledSider = styled(Layout.Sider)`
  position: fixed;
  top: 0;
  left: 0;
  padding: 56px 0 0;
  background-color: ${colors.white};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  @media (max-width: 1280px) {
    transform: translateX(-100%);
  }
`;

const StyleLogo = styled.img`
  height: 24px;
  object-fit: contain;
  cursor: pointer;
  @media (max-width: 1280px) {
    display: none;
  }
`;

const StyledContent = styled(Layout.Content)`
  max-width: 1024px;
  margin: 0 auto;
  padding: 106px 0 50px;
`;

const StyledLayout = styled(Layout)<StyledLayoutProps>`
  background-color: ${(props) =>
    props.shouldApplyGrayBackground ? colors.midGray : 'white'};
  padding: 0 0 0 256px;
  @media (max-width: 1280px) {
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
  @media (max-width: 1280px) {
    display: flex;
  }
`;
