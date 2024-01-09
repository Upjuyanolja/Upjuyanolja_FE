import { useState } from 'react';
import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { FormErrorMessage } from '@components/init/FormErrorMessage';
import {
  PriceContainerProps,
  PriceHandleInputChangeProps,
  ValidateInputProps,
} from '../type';
import {
  NUMBER_REGEX,
  MAX_PRICE,
  MIN_PRICE,
  MAX_PRICE_LENGTH,
  MIN_PRICE_LENGTH,
} from '@/constants/room/room-registration';
import { TextBox } from '@components/text-box';

export const PriceContainer = ({ labelText }: PriceContainerProps) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateInput = ({ value }: ValidateInputProps) => {
    if (value < MIN_PRICE || value > MAX_PRICE) {
      setError('10,000~1,000,000까지만 입력 가능합니다.');
    } else if (!NUMBER_REGEX.test(value.toString())) {
      setError('숫자만 입력 가능합니다.');
    } else {
      setError(null);
    }
  };

  const handleInputChange = ({ event }: PriceHandleInputChangeProps) => {
    const stringValue = event.target.value.slice(0, MAX_PRICE_LENGTH);
    setInputValue(stringValue);
    const numericValue = Number(stringValue);
    validateInput({ value: numericValue });
  };

  return (
    <StyledInputWrapper>
      <Form.Item
        rules={[{ required: true }]}
        label={labelText}
        colon={false}
        style={{ marginBottom: 0 }}
      >
        <StyledRow>
          <StyledTextBoxWrapper>
            <TextBox typography="body1" color="black900" fontWeight="normal">
              1박 당
            </TextBox>
          </StyledTextBoxWrapper>
          <StyledInput
            id="price"
            placeholder={''}
            type="text"
            minLength={MIN_PRICE_LENGTH}
            maxLength={MAX_PRICE_LENGTH}
            style={{
              height: 40,
              width: labelText === '' ? '440px' : '',
            }}
            value={inputValue.toString()}
            onChange={(event) => handleInputChange({ event })}
            disabled={inputValue.toString().length >= MAX_PRICE_LENGTH}
            status={error ? 'error' : ''}
            data-testid="input-price"
          />
          {error && (
            <StyledErrorMessageWrapper data-testid="error-input-price">
              <StyledFormErrorMessage errorMessage={error} />
            </StyledErrorMessageWrapper>
          )}
          <StyledTextBoxWrapper>
            <TextBox typography="body1" color="black900" fontWeight="normal">
              원
            </TextBox>
          </StyledTextBoxWrapper>
        </StyledRow>
      </Form.Item>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
  position: relative;

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

  .ant-input {
    font-size: 16px;
  }
`;

const StyledErrorMessageWrapper = styled.div`
  height: 18px;
  position: absolute;
  bottom: -24px;
  left: 0;
  width: 100%;
`;

const StyledFormErrorMessage = styled(FormErrorMessage)`
  float: left;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const StyledTextBoxWrapper = styled.div`
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
  }
`;

const StyledInput = styled(Input)`
  width: 160px;
  height: 40px;
  font-size: 16px;
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
`;
