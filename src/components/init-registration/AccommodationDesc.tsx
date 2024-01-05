import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { FormErrorMessage } from '@components/init-registration/FormErrorMessage';
import { useState, ChangeEvent } from 'react';

export const AccommodationDesc = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  {
    /*최소,최대 글자 수 상수 */
  }
  const MIN_LENGTH = 10;
  const MAX_LENGTH = 500;

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value.slice(0, MAX_LENGTH);
    setInputValue(newValue);
    validateInput(newValue);
  };

  const validateInput = (value: string) => {
    if (value.length < MIN_LENGTH) {
      setError(`숙소 소개는 최소 ${MIN_LENGTH}자 이상 작성해 주세요.`);
    } else {
      setError(null);
    }
  };

  return (
    <StyledInputWrapper>
      <Form.Item rules={[{ required: true }]} label="숙소 소개" colon={false}>
        <Input.TextArea
          id="accommodationDesc"
          placeholder="고객에게 멋진 숙소를 소개해 주세요."
          minLength={MIN_LENGTH}
          showCount
          maxLength={MAX_LENGTH}
          disabled={inputValue.length >= MAX_LENGTH}
          style={{ height: 160, resize: 'none' }}
          onChange={handleInputChange}
        />
        <StyledErrorMessageWrapper>
          {error && <StyledFormErrorMessage errorMessage={error} />}
        </StyledErrorMessageWrapper>
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
