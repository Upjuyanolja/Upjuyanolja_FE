import { TextBox } from '@components/text-box';
import { Button, Modal } from 'antd';
import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { useState } from 'react';
import { AccommodationListProps, StyledAccommodationWrapProps } from './type';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Accommodation } from '@api/accommodation/type';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { setCookie } from '@hooks/sign-in/useSignIn';
import { useRecoilValue } from 'recoil';
import { isCouponModifiedState } from '@stores/coupon/atom';

export const AccommodationList = ({
  accommodationListData,
}: AccommodationListProps) => {
  const [clickedSelectBox, setClickedSelectBox] = useState(false);
  const [accommodationIdx, setAccommodationIdx] = useState(0);
  const { accommodations } = accommodationListData || { accommodations: [] };
  const navigate = useNavigate();
  const location = useLocation();
  const isCouponModified = useRecoilValue(isCouponModifiedState);

  const handleSelectBox = () => {
    setClickedSelectBox(!clickedSelectBox);
  };

  const checkModified = (item: Accommodation, idx: number) => {
    if (isCouponModified)
      Modal.confirm({
        title: '수정사항이 저장되지 않았습니다.',
        content: '페이지를 나가겠습니까?',
        cancelText: '나가기',
        okText: '취소',
        className: 'confirm-modal',
        onCancel: () => {
          handleNavigate(item, idx);
        },
      });
    else {
      handleNavigate(item, idx);
    }
  };

  const handleNavigate = (item: Accommodation, idx: number) => {
    const accommodationId = item.id;
    const currentPath = location.pathname;
    const replacedPath = currentPath.split('/').slice(2, 100).join('/');

    if (currentPath === ROUTES.POINT_DETAIL) {
      const newPath = ROUTES.POINT_DETAIL;
      return navigate(newPath);
    }

    if (currentPath === ROUTES.USER_GUIDE) {
      const newPath = ROUTES.USER_GUIDE;
      return navigate(newPath);
    }

    const newPath = `/${accommodationId}/${replacedPath}`;
    navigate(newPath);
    setAccommodationIdx(idx);
    setCookie('accommodationId', accommodationId.toString());
  };

  const navigateToAccommodationAddPage = () => {
    if (isCouponModified)
      Modal.confirm({
        title: '수정사항이 저장되지 않았습니다.',
        content: '페이지를 나가겠습니까?',
        cancelText: '나가기',
        okText: '취소',
        className: 'confirm-modal',
        onCancel: () => {
          navigate(ROUTES.INIT_ACCOMMODATION_REGISTRATION);
        },
      });
    else {
      navigate(ROUTES.INIT_ACCOMMODATION_REGISTRATION);
    }
  };

  return (
    <Container>
      <StyledButton onClick={handleSelectBox}>
        <StyledFlex>
          <TextBox typography="body2" fontWeight="bold">
            {accommodations[accommodationIdx]?.name}
          </TextBox>
        </StyledFlex>
        {clickedSelectBox ? <UpOutlined /> : <DownOutlined />}
      </StyledButton>
      <StyledAccommodationWrap
        clickedSelectBox={clickedSelectBox}
        className={clickedSelectBox ? 'active' : null}
      >
        {accommodations?.map((item, idx) => (
          <StyledAccommodationItem
            key={item.id}
            onClick={() => checkModified(item, idx)}
          >
            <StyledFlex>
              <TextBox typography="body3" fontWeight="bold">
                {item.name}
              </TextBox>
            </StyledFlex>
          </StyledAccommodationItem>
        ))}
        <StyledAccommodationItem onClick={navigateToAccommodationAddPage}>
          <TextBox typography="body3" fontWeight={700} color="primary">
            + 숙소 추가하기
          </TextBox>
        </StyledAccommodationItem>
      </StyledAccommodationWrap>
    </Container>
  );
};

const Container = styled.div``;

const StyledButton = styled(Button)`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-radius: 0;
`;

const StyledAccommodationWrap = styled.ul<StyledAccommodationWrapProps>`
  padding: 0;
  margin-bottom: 0;
  height: 0;
  overflow: hidden;
  ${(props) =>
    props.clickedSelectBox && `border-bottom: 0.5px solid ${colors.black500};`}
  &.active {
    height: auto;
  }
`;

const StyledAccommodationItem = styled.li`
  padding: 5px 0 5px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.lightHover};
  }
  &:active {
    background-color: ${colors.lightActive};
  }
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
`;
