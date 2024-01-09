import { useState } from 'react';
import { InputNumber, Col } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { FormErrorMessage } from '@components/init/FormErrorMessage';
import { ValidateInputProps, NumOfRoomsContainerProps } from './type';
import {
  MIN_NUM_OF_ROOMS,
  MAX_NUM_OF_ROOMS,
} from '@/constants/room/room-registration/';

export const NumOfRoomsContainer = ({ header }: NumOfRoomsContainerProps) => {
  const [numOfRoomsValue, setNumOfRoomsValue] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  const validateInput = ({ value }: ValidateInputProps) => {
    setError(null);
    if (value < MIN_NUM_OF_ROOMS || value > MAX_NUM_OF_ROOMS) {
      setError('1~100까지만 입력 가능합니다.');
      // } else if (!NUMBER_REGEX.test(value.toString())) {
      //   setError('숫자만 입력 가능합니다.');
      // 다른 예외 처리는 내일 담당 PM분과 상의 후 처리 할 예정입니다.
    }
  };

  const handleCapacityChange = (
    newValue: number | string | null | undefined,
  ) => {
    if (typeof newValue !== 'number') return;
    validateInput({ value: newValue });
    setNumOfRoomsValue(newValue);
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
            일일 예약 가능 객실
          </TextBox>
        </StyledTextBoxWrapper>
        <StyledInputNumber
          min={1}
          max={100}
          defaultValue={1}
          value={numOfRoomsValue}
          onChange={handleCapacityChange}
        />
        <StyledTextBoxWrapper>
          <TextBox typography="body1" color="black900" fontWeight="normal">
            개
          </TextBox>
        </StyledTextBoxWrapper>
      </StyledRow>
      {error && (
        <StyledErrorMessageWrapper data-testid="error-input-num-of-rooms">
          <StyledFormErrorMessage errorMessage={error} />
        </StyledErrorMessageWrapper>
      )}
    </StyledInputWrapper>
  );
};

const StyledHeadTextContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledErrorMessageWrapper = styled.div`
  height: 18px;
  width: 100%;
  position: absolute;
  bottom: -24px;
  left: 0;
`;

const StyledFormErrorMessage = styled(FormErrorMessage)`
  float: left;
  position: absolute;
  bottom: 0;
  left: 0;
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
