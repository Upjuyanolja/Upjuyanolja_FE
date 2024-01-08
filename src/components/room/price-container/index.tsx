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
  PRICE_REGEX,
  MAX_PRICE,
  MIN_PRICE,
  MAX_PRICE_LENGTH,
  MIN_PRICE_LENGTH,
} from '@/constants/room/room-registration';

export const PriceContainer = ({ labelText }: PriceContainerProps) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateInput = ({ value }: ValidateInputProps) => {
    if (value < MIN_PRICE || value > MAX_PRICE) {
      setError('10,000~1,000,000까지만 입력 가능합니다.');
    } else if (!PRICE_REGEX.test(value.toString())) {
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
      <Form.Item rules={[{ required: true }]} label={labelText} colon={false}>
        <Input
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
      </Form.Item>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  width: 160px;
  height: 40px;
  margin-bottom: 48px !important;

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
  margin-bottom: 48px;
`;

const StyledFormErrorMessage = styled(FormErrorMessage)`
  float: left;
`;
