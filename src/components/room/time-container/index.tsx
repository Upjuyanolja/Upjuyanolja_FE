import { useState } from 'react';
import { InputNumber, Select } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { TimeContainerProps } from './type';

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 9; hour < 24; hour++) {
    times.push(`${hour < 10 ? '0' + hour : hour}:00`);
    times.push(`${hour < 10 ? '0' + hour : hour}:30`);
  }
  return times;
};

export const TimeContainer = ({ header }: TimeContainerProps) => {
  const [timeValue, setTimeValue] = useState('09:00');
  const timeOptions = generateTimeOptions();

  const handleTimeChange = (value: number): void => {
    const selectedTime = timeOptions[value];
    setTimeValue(selectedTime);
  };

  return (
    <StyledInputWrapper>
      <StyledHeadTextContainer>
        <TextBox typography="h4" fontWeight={700}>
          {header}
        </TextBox>
      </StyledHeadTextContainer>
      <StyledRow>
        <StyledTextBoxWrapper>
          <TextBox typography="body1" color="black900" fontWeight="normal">
            체크인
          </TextBox>
        </StyledTextBoxWrapper>
        <Select
          showSearch
          value={timeOptions.indexOf(timeValue)}
          style={{ width: 120 }}
          onChange={handleTimeChange}
          dropdownMatchSelectWidth={false}
        >
          {timeOptions.map((time, index) => (
            <Select.Option key={time} value={index}>
              {time}
            </Select.Option>
          ))}
        </Select>
        <StyledTextBoxWrapper>
          <TextBox typography="body1" color="black900" fontWeight="normal">
            분
          </TextBox>
        </StyledTextBoxWrapper>
      </StyledRow>
    </StyledInputWrapper>
  );
};

const StyledHeadTextContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledInputNumber = styled(InputNumber)`
  display: flex;
  width: 90px;
  height: 40px;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  margin-right: 4px;

  .ant-input-number-input {
    width: 100%;
    text-align: right;
    padding-right: 34px;
  }
`;

const StyledTextBoxWrapper = styled.div`
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
  }
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8;
`;

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
  position: relative;

  .ant-form-item-header {
    header {
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

  .ant-input {
    font-size: 16px;
  }
`;
