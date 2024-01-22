import { TextBox } from '@components/text-box';
import { Button } from 'antd';
import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { useEffect, useState } from 'react';
import { AccommodationListProps, StyledAccommodationWrapProps } from './type';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Accommodation } from '@api/accommodation/type';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { getCookie, setCookie } from '@hooks/sign-in/useSignIn';

export const AccommodationList = ({
  accommodationListData,
}: AccommodationListProps) => {
  const [clickedSelectBox, setClickedSelectBox] = useState(false);
  const [accommodationIdx, setAccommodationIdx] = useState(0);
  const { accommodations } = accommodationListData || { accommodations: [] };
  const navigate = useNavigate();
  const location = useLocation();
  const { accommodationId } = useParams();

  const handleSelectBox = () => {
    if (accommodations.length <= 1) return;
    setClickedSelectBox(!clickedSelectBox);
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
    alert('변경됨1');
  };

  const navigateToAccommodationAddPage = () => {
    navigate(ROUTES.INIT_ACCOMMODATION_REGISTRATION);
  };

  useEffect(() => {
    alert('변경됨2');
    return () => {
      if (accommodationId !== getCookie('accommodationId')) {
        alert('변경됨3');
        const currentAccommodationId = getCookie('accommodationId');
        const currentPath = location.pathname;
        const replacedPath = currentPath.split('/').slice(2, 100).join('/');
        const newPath = `/${currentAccommodationId}/${replacedPath}`;
        navigate(newPath);
      }
    };
  }, [accommodationId]);

  return (
    <Container>
      <StyledButton onClick={handleSelectBox}>
        <StyledFlex>
          <TextBox typography="body2" fontWeight="bold">
            {accommodations[accommodationIdx]?.name}
          </TextBox>
        </StyledFlex>
        {accommodations.length > 1 &&
          (clickedSelectBox ? <UpOutlined /> : <DownOutlined />)}
      </StyledButton>
      <StyledAccommodationWrap
        clickedSelectBox={clickedSelectBox}
        className={clickedSelectBox ? 'active' : null}
      >
        {accommodations?.map((item, idx) => (
          <StyledAccommodationItem
            key={item.id}
            onClick={() => handleNavigate(item, idx)}
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
