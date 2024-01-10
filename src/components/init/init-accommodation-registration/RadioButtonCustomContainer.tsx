import { TextBox } from '@components/text-box';
import {
  AccommodationDetailCategoryOnchangeProps,
  AccommodationDetailCategoryProps,
} from './type';
import styled from 'styled-components';
import { Form, Radio } from 'antd';
import { useState } from 'react';

export const RadioButtonCustomContainer = ({
  label,
  options,
  icon,
}: AccommodationDetailCategoryProps) => {
  const [value, setValue] = useState('');

  const onChange = ({ event }: AccommodationDetailCategoryOnchangeProps) => {
    setValue(event.target.value);
  };

  return (
    <StyledWrapper>
      <StyledTextContainer>
        {icon}
        <TextBox typography="body1" fontWeight={700}>
          {label}
        </TextBox>
      </StyledTextContainer>
      <Form.Item name="accommodation-category">
        <StyledCheckboxRadioGroup
          onChange={(event) => onChange({ event })}
          value={value}
        >
          {options.map((option, index) => (
            <StyledCheckboxRadio value={option} key={index}>
              {option}
            </StyledCheckboxRadio>
          ))}
        </StyledCheckboxRadioGroup>
      </Form.Item>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #f9f9fa;
  border-radius: 8px;
  padding: 8px 24px;

  .ant-radio-group {
    display: flex;
    gap: 60px;
    align-items: center;
  }
`;

const StyledTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledCheckboxRadioGroup = styled(Radio.Group)`
  .ant-radio-wrapper {
    font-size: 16px;
    font-weight: 700;

    display: flex;
    justify-content: center;
  }

  .ant-radio-input {
    display: none;
  }

  .ant-radio-inner {
    border-radius: 3px;
    border: 1px solid #d9d9d9;

    width: 16px;
    height: 16px;

    &:hover {
      border: 1px solid #0351ff;
      transition: 0.3s;
    }
  }

  .ant-radio-checked {
    .ant-radio-inner {
      background-color: #0351ff;
      border-color: #0351ff;
    }

    .ant-radio-inner::after {
      content: '\u2713';
      color: #fff;
      font-size: 30px;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const StyledCheckboxRadio = styled(Radio)`
  display: block;
`;
