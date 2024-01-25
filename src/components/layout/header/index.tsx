import { colors } from '@/constants/colors';
import { MOBILE_BREAKPOINTS } from '@/constants/mobile';
import { TextBox } from '@components/text-box';
import { getCookie } from '@hooks/sign-in/useSignIn';
import { isCouponModifiedState } from '@stores/coupon/atom';
import { isSideBarOpenState } from '@stores/layout';
import { Layout, Modal } from 'antd';
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import logoImg from '@assets/image/logo.png';
import { ROUTES } from '@/constants/routes';

export const Header = () => {
  const navigate = useNavigate();
  const setIsOpenSideBar = useSetRecoilState(isSideBarOpenState);
  const isCouponModified = useRecoilValue(isCouponModifiedState);
  const openSideBar = () => {
    setIsOpenSideBar(true);
  };
  const moveToMain = () => {
    const accommodationId = getCookie('accommodationId');
    const updatedMainPath = `/${accommodationId}${ROUTES.MAIN}`;

    if (isCouponModified)
      Modal.confirm({
        title: '수정사항이 저장되지 않았습니다.',
        content: '페이지를 나가겠습니까?',
        cancelText: '나가기',
        okText: '취소',
        className: 'confirm-modal',
        onCancel: () => {
          navigate(updatedMainPath);
        },
      });
    else {
      navigate(updatedMainPath);
    }
  };
  return (
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
  z-index: 7;
  @media (max-width: ${MOBILE_BREAKPOINTS}) {
    z-index: 4;
  }
`;

const StyleLogo = styled.img`
  height: 24px;
  object-fit: contain;
  cursor: pointer;
  @media (max-width: ${MOBILE_BREAKPOINTS}) {
    display: none;
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
  @media (max-width: ${MOBILE_BREAKPOINTS}) {
    display: flex;
  }
`;
