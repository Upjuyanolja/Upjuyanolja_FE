import { TextBox } from '@components/atom/text-box';
import { AccommodationDetailCategoryProps } from './type';
import styled from 'styled-components';
import { Form, Radio, RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';
import { colors } from '@/constants/colors';

export const RadioButtonCustomContainer = ({
  label,
  options,
  icon,
  form,
  defaultValue,
  isClickedPrevButton,
  updatedAccommodationInfo,
}: AccommodationDetailCategoryProps) => {
  const [value, setValue] = useState('');

  const onChange = (event: RadioChangeEvent) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue('');
    '호텔' in options
      ? form.setFieldValue('accommodation-hotel-category', '')
      : form.setFieldValue('accommodation-guest-category', '');

    if (defaultValue || isClickedPrevButton || updatedAccommodationInfo) {
      '호텔' in options
        ? form.setFieldValue('accommodation-hotel-category', defaultValue)
        : form.setFieldValue('accommodation-guest-category', defaultValue);
    }
  }, []);

  return (
    <StyledWrapper>
      <StyledTextContainer>
        {icon}
        <TextBox typography="body1" fontWeight={700}>
          {label}
        </TextBox>
      </StyledTextContainer>
      <Form.Item
        name={
          '호텔' in options
            ? 'accommodation-hotel-category'
            : 'accommodation-guest-category'
        }
        initialValue=""
      >
        <StyledCheckboxRadioGroup onChange={onChange} value={value}>
          {Object.entries(options).map(([korean, english]) => (
            <StyledCheckboxRadio value={english} key={english}>
              {korean}
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
  background-color: ${colors.black100};
  border-radius: 8px;
  padding: 8px 24px;

  .ant-radio-group {
    display: flex;
    gap: 60px;
    align-items: center;
  }

  margin-bottom: 48px;

  .ant-form-item {
    margin-bottom: 0;
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
      border: 1px solid ${colors.primary};
      transition: 0.3s;
    }
  }

  .ant-radio-checked {
    .ant-radio-inner {
      background-color: ${colors.primary};
      border-color: ${colors.primary};
    }

    .ant-radio-inner::after {
      content: '\u2713';
      color: ${colors.white};
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
