import TextBox from '@components/text';
import { Button } from 'antd';
import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { useState } from 'react';
import {
  StyledAccommodationItemProps,
  StyledAccommodationWrapProps,
} from './type';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

export const AccommodationList = () => {
  const [clickedSelectBox, setClickedSelectBox] = useState(false);
  const accommodationMap = [
    {
      name: '패캠스테이 삼성점',
      id: 'accommodation1',
      icon: null,
      test: true,
    },
    {
      name: '패캠스테이 수원점',
      id: 'accommodation2',
      icon: null,
      test: false,
    },
    {
      name: '패캠스테이 천안점',
      id: 'accommodation3',
      icon: null,
      test: false,
    },
    {
      name: '패캠스테이 인천점',
      id: 'accommodation4',
      icon: null,
      test: false,
    },
    {
      name: '패캠스테이 부산점',
      id: 'accommodation5',
      icon: null,
      test: false,
    },
  ];

  const handleSelectBox = () => {
    setClickedSelectBox(!clickedSelectBox);
  };

  return (
    <Container>
      <StyledButton onClick={handleSelectBox}>
        <TextBox typography="body2" bold={true}>
          {accommodationMap[0].name}
        </TextBox>
        {clickedSelectBox ? <UpOutlined /> : <DownOutlined />}
      </StyledButton>
      <StyledAccommodationWrap height={clickedSelectBox ? 'auto' : '0'}>
        {accommodationMap.map((item) => (
          <StyledAccommodationItem
            key={item.id}
            hoverColor={colors.light}
            activeColor={colors.lightActive}
          >
            <TextBox typography="body3">{item.name}</TextBox>
          </StyledAccommodationItem>
        ))}
      </StyledAccommodationWrap>
    </Container>
  );
};

const Container = styled.div`
  box-shadow: 0px 9px 28px 8px #0000000d;

  box-shadow: 0px 6px 16px 0px #00000014;

  box-shadow: 0px 3px 6px -4px #0000001f;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
`;

const StyledAccommodationWrap = styled.ul<StyledAccommodationWrapProps>`
  padding: 0;
  margin-bottom: 0;
  height: ${(props) => props.height};
  overflow: hidden;
`;

const StyledAccommodationItem = styled.li<StyledAccommodationItemProps>`
  padding: 5px 0 5px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  &:active {
    background-color: ${(props) => props.activeColor};
  }
`;
