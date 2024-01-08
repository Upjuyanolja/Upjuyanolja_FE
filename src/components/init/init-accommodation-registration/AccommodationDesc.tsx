import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { useState } from 'react';
import { FormErrorMessage } from '@components/init/FormErrorMessage';
import { HandleTextAreaChangeProps } from './type';
import {
  ACCOMMODATION_DESC_MAX_LENGTH,
  ACCOMMODATION_DESC_MIN_LENGTH,
} from '@/constants/init/init-accommodation-registration';
import { ValidateInputProps } from '../type';

export const AccommodationDesc = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleTextAreaChange = ({ event }: HandleTextAreaChangeProps) => {
    const newValue = event.target.value.slice(0, ACCOMMODATION_DESC_MAX_LENGTH);
    setTextAreaValue(newValue);
    validateTextArea({ value: newValue });
  };

  const validateTextArea = ({ value }: ValidateInputProps) => {
    if (value.length < ACCOMMODATION_DESC_MIN_LENGTH) {
      setError(
        `숙소 소개는 최소 ${ACCOMMODATION_DESC_MIN_LENGTH}자 이상 작성해 주세요.`,
      );
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
          minLength={ACCOMMODATION_DESC_MIN_LENGTH}
          showCount
          maxLength={ACCOMMODATION_DESC_MAX_LENGTH}
          disabled={textAreaValue.length >= ACCOMMODATION_DESC_MAX_LENGTH}
          style={{ height: 160, resize: 'none' }}
          onChange={(event) => handleTextAreaChange({ event })}
          status={error ? 'error' : ''}
          data-testid="textarea-accommodation-desc"
        />
        {error && (
          <StyledErrorMessageWrapper data-testid="error-textarea-accommodation-desc">
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
