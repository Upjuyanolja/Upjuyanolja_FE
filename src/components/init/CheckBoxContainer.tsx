import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import { CheckBoxContainerProps } from './type';

export const CheckBoxContainer = ({
  options,
  header,
}: CheckBoxContainerProps) => {
  return (
    <StyledWrapper color={colors.white}>
      <TextBox typography="h4" fontWeight={700}>
        {header}
      </TextBox>
      <StyledCheckboxGroup options={options}></StyledCheckboxGroup>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  background-color: ${(props) => props.color};

  padding: 0;
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
