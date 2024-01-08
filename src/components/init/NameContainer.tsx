import { useState } from 'react';
import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { FormErrorMessage } from '@components/init/FormErrorMessage';
import {
  NameConatainerProps,
  NameHandleInputChangeProps,
  ValidateInputProps,
} from './type';
import {
  ACCOMMODATION_NAME_MAX_LENGTH,
  ACCOMMODATION_NAME_MIN_LENGTH,
} from '@/constants/init/init-accommodation-registration';
import { NAME_REGEX } from '@/constants/init';

export const NameContainer = ({ header }: NameConatainerProps) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateInput = ({ value }: ValidateInputProps) => {
    if (value.length < ACCOMMODATION_NAME_MIN_LENGTH) {
      setError(
        `${header}은 최소 ${ACCOMMODATION_NAME_MIN_LENGTH}자 이상 작성해 주세요.`,
      );
    } else if (!NAME_REGEX.test(value)) {
      setError('한글, 영어, 숫자만 입력 가능합니다.');
    } else {
      setError(null);
    }
  };

  const handleInputChange = ({ event }: NameHandleInputChangeProps) => {
    const newValue = event.target.value.slice(0, ACCOMMODATION_NAME_MAX_LENGTH);
    setInputValue(newValue);
    validateInput({ value: newValue });
  };

  return (
    <StyledInputWrapper>
      <Form.Item
        rules={[{ required: true }]}
        label={header}
        colon={false}
        htmlFor="input-name"
      >
        <Input
          id="input-name"
          placeholder={`${header}을 입력해 주세요.`}
          type="text"
          minLength={ACCOMMODATION_NAME_MIN_LENGTH}
          maxLength={ACCOMMODATION_NAME_MAX_LENGTH}
          style={{ height: 40, width: header === '객실명' ? '440px' : '' }}
          value={inputValue}
          onChange={(event) => handleInputChange({ event })}
          disabled={inputValue.length >= ACCOMMODATION_NAME_MAX_LENGTH}
          status={error ? 'error' : ''}
          data-testid="input-name"
          autoComplete="on"
        />
        {error && (
          <StyledErrorMessageWrapper data-testid="error-input-name">
            <StyledFormErrorMessage errorMessage={error} />
          </StyledErrorMessageWrapper>
        )}
      </Form.Item>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;

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
`;

const StyledFormErrorMessage = styled(FormErrorMessage)`
  float: left;
`;
