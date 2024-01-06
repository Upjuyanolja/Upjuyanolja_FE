import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import { CheckBoxContainerProps, CheckBoxStyledWrapperProps } from './type';

export const CheckBoxContainer = ({
  options,
  label,
  isAccommodationCategory,
}: CheckBoxContainerProps) => {
  return (
    <StyledWrapper
      color={isAccommodationCategory ? colors.white100 : colors.white}
      $wrapperPadding={isAccommodationCategory ? '8px 24px' : '0'}
      $wrapperGap={isAccommodationCategory ? '16px' : '8px'}
    >
      <TextBox
        typography={isAccommodationCategory ? 'body1' : 'h4'}
        fontWeight={700}
      >
        {label}
      </TextBox>
      <StyledCheckboxGroup options={options}></StyledCheckboxGroup>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<CheckBoxStyledWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$wrapperGap};

  background-color: ${(props) => props.color};

  padding: ${(props) => props.$wrapperPadding};
`;

const StyledCheckboxGroup = styled(Checkbox.Group)`
  line-height: 24px;
  font-weight: 700;

  .ant-checkbox-group-item {
    font-size: 16px;
  }

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 60px;
  grid-auto-flow: row;
  grid-row-gap: 20px;
`;
