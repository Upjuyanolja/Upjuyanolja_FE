import { useState } from 'react';
import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { FormErrorMessage } from '@components/init/FormErrorMessage';
import { NameHandleInputChangeProps, ValidateInputProps } from './type';

export const AccommodationName = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  {
    /*최소,최대 글자 수 상수 */
  }
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 30;

  const validateInput = ({ value }: ValidateInputProps) => {
    const specialCharacterRegex = /^[ㄱ-ㅎ가-힣A-Za-z0-9\s]*$/;

    if (value.length < MIN_LENGTH) {
      setError(`숙소명은 최소 ${MIN_LENGTH}자 이상 작성해 주세요.`);
    } else if (!specialCharacterRegex.test(value)) {
      setError('한글, 영어, 숫자만 입력 가능합니다.');
    } else {
      setError(null);
    }
  };

  const handleInputChange = ({ event }: NameHandleInputChangeProps) => {
    const newValue = event.target.value.slice(0, MAX_LENGTH);
    setInputValue(newValue);
    validateInput({ value: newValue });
  };

  return (
    <StyledInputWrapper>
      <Form.Item rules={[{ required: true }]} label="숙소명" colon={false}>
        <Input
          id="accommodationName"
          placeholder="숙소명을 입력해 주세요."
          type="text"
          minLength={MIN_LENGTH}
          maxLength={MAX_LENGTH}
          style={{ height: 40 }}
          value={inputValue}
          onChange={(event) => handleInputChange({ event })}
          disabled={inputValue.length >= MAX_LENGTH}
          status={error ? 'error' : ''}
          data-testid="input-accommodation-name"
        />
        {error && (
          <StyledErrorMessageWrapper data-testid="error-input-accommodation-name">
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