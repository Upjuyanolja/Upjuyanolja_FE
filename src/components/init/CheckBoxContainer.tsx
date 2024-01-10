import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { Checkbox, Form } from 'antd';
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
      <Form.Item
        name="accommodation-options"
        valuePropName="checked"
        rules={[{ required: false }]}
      >
        <StyledCheckboxContainer>
          {options.map((option, index) => (
            <Checkbox id={index.toString()} key={index}>
              {option}
            </Checkbox>
          ))}
        </StyledCheckboxContainer>
      </Form.Item>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-bottom: 48px;

  background-color: ${(props) => props.color};

  padding: 0;

  .ant-form-item-control {
    width: 100%;
  }

  .ant-checkbox-wrapper-in-form-item {
    font-size: 16px;
  }

  .ant-checkbox-wrapper + .ant-checkbox-wrapper {
    margin-left: 0;
  }
`;

const StyledCheckboxContainer = styled.div`
  line-height: 24px;
  font-weight: 700;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 60px;
  grid-auto-flow: row;
  grid-row-gap: 20px;
`;
