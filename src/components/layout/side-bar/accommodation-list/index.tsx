import { TextBox } from '@components/text-box';
import { Button } from 'antd';
import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { useState } from 'react';
import { StyledAccommodationWrapProps } from './type';
import { CheckCircleFilled, DownOutlined, UpOutlined } from '@ant-design/icons';

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
        <StyledFlex>
          <TextBox typography="body2" fontWeight="bold">
            {accommodationMap[0].name}
          </TextBox>
          {accommodationMap.map(
            (item, index) =>
              item.test && <StyledCheckCircleFilled key={index} />,
          )}
        </StyledFlex>
        {clickedSelectBox ? <UpOutlined /> : <DownOutlined />}
      </StyledButton>
      <StyledAccommodationWrap className={clickedSelectBox ? 'active' : null}>
        {accommodationMap.map((item, index) => (
          <StyledAccommodationItem key={item.id}>
            <StyledFlex>
              <TextBox typography="body3" fontWeight="bold">
                {item.name}
              </TextBox>
              {item.test && <StyledCheckCircleFilled key={index} />}
            </StyledFlex>
          </StyledAccommodationItem>
        ))}
      </StyledAccommodationWrap>
    </Container>
  );
};

const Container = styled.div`
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
  height: 0;
  overflow: hidden;
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

const StyledCheckCircleFilled = styled(CheckCircleFilled)`
  font-size: 18px;
  color: ${colors.primary};
  margin-left: 4px;
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
`;
