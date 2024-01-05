import { useState, ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { FormErrorMessage } from './FormErrorMessage';
import { Input, Form } from 'antd';

export const AccommodationName = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateInput = (value: string) => {
    if (value.length < 2) {
      setError('숙소명은 최소 2자 이상 작성해 주세요.');
    } else {
      setError(null);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.slice(0, 30);
    setInputValue(newValue);
    validateInput(newValue);
  };

  return (
    <StyledInputWrapper>
      <Form.Item rules={[{ required: true }]} label="숙소명" colon={false}>
        <Input
          id="accommodationName"
          placeholder="숙소명을 입력해 주세요."
          type="text"
          minLength={2}
          maxLength={30}
          showCount
          style={{ height: 40 }}
          value={inputValue}
          onChange={handleInputChange}
          disabled={inputValue.length >= 30}
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

export default AccommodationName;
