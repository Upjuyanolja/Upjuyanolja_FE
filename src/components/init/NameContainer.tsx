import { useState } from 'react';
import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { FormErrorMessage } from '@components/init/FormErrorMessage';
import {
  NameContainerProps,
  NameHandleInputChangeProps,
  ValidateInputProps,
} from './type';
import {
  ACCOMMODATION_NAME_MAX_LENGTH,
  ACCOMMODATION_NAME_MIN_LENGTH,
} from '@/constants/init/init-accommodation-registration';
import { NAME_REGEX } from '@/constants/init';
import { TextBox } from '@components/text-box';

export const NameContainer = ({ header }: NameContainerProps) => {
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
      <TextBox typography="h4" fontWeight={700}>
        {header}
      </TextBox>
      <Form.Item name="accommodation-name">
        <Input
          id="accommodation-name"
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
      </Form.Item>
      <StyledErrorMessageWrapper data-testid="error-input-name">
        {error && <StyledFormErrorMessage errorMessage={error} />}
      </StyledErrorMessageWrapper>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  .ant-input {
    font-size: 16px;
  }

  .ant-form-item {
    margin-bottom: 0;
  }
`;

const StyledErrorMessageWrapper = styled.div`
  height: 18px;
`;

const StyledFormErrorMessage = styled(FormErrorMessage)`
  float: left;
`;
