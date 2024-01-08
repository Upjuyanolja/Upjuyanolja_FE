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
      <StyledCheckboxContainer>
        {options.map((option, index) => (
          <Form.Item
            key={index}
            name={`checkbox-option-${index}`}
            valuePropName="checked"
            rules={[{ required: false }]}
          >
            <Checkbox id={`checkbox-option-${index}`}>{option}</Checkbox>
          </Form.Item>
        ))}
      </StyledCheckboxContainer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  background-color: ${(props) => props.color};

  padding: 0;

  .ant-form-item-label {
    label {
      font-size: 24px;
      font-weight: 700;
      line-height: 36px;
    }
  }

  .ant-form-item-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .ant-form-item-control {
    width: 100%;
  }
`;

const StyledCheckboxContainer = styled.div`
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
