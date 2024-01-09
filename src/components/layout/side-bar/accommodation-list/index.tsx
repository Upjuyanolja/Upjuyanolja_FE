import { TextBox } from '@components/text-box';
import { Button } from 'antd';
import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { useState } from 'react';
import { AccommodationListProps, StyledAccommodationWrapProps } from './type';
import { CheckCircleFilled, DownOutlined, UpOutlined } from '@ant-design/icons';

export const AccommodationList = ({
  accommodationListData,
}: AccommodationListProps) => {
  const [clickedSelectBox, setClickedSelectBox] = useState(false);
  const { accommodations } = accommodationListData;

  const handleSelectBox = () => {
    if (accommodations.length <= 1) return;
    setClickedSelectBox(!clickedSelectBox);
  };

  return (
    <Container>
      <StyledButton onClick={handleSelectBox}>
        <StyledFlex>
          <TextBox typography="body2" fontWeight="bold">
            {accommodations[0].name}
          </TextBox>
          <StyledCheckCircleFilled />
        </StyledFlex>
        {clickedSelectBox ? <UpOutlined /> : <DownOutlined />}
      </StyledButton>
      <StyledAccommodationWrap className={clickedSelectBox ? 'active' : null}>
        {accommodations.map((item, index) => (
          <StyledAccommodationItem key={item.id}>
            <StyledFlex>
              <TextBox typography="body3" fontWeight="bold">
                {item.name}
              </TextBox>
              <StyledCheckCircleFilled key={index} />
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
