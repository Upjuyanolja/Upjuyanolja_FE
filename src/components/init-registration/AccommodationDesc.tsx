import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { FormErrorMessage } from '@components/init-registration/FormErrorMessage';
import { useState, ChangeEvent } from 'react';

export const AccommodationDesc = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value.slice(0, 500);
    setInputValue(newValue);
    validateInput(newValue);
  };

  const validateInput = (value: string) => {
    if (value.length < 10) {
      setError('숙소 소개는 최소 10자 이상 작성해 주세요.');
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
          minLength={10}
          showCount
          maxLength={500}
          disabled={inputValue.length >= 500}
          style={{ height: 160, resize: 'none' }}
          onChange={handleInputChange}
        />
        <StyledCharacterCountWrapper>
          {error && <StyledFormErrorMessage errorMessage={error} />}
        </StyledCharacterCountWrapper>
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
`;

const StyledCharacterCountWrapper = styled.div`
  height: 18px;
`;

const StyledFormErrorMessage = styled(FormErrorMessage)`
  float: left;
`;
