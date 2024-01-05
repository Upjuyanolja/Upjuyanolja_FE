import { useState, ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { FormErrorMessage } from './FormErrorMessage';
import { Input, Form } from 'antd';
import { TextBox } from '@components/text-box';

export const AccommodationName = () => {
  const [inputValue, setInputValue] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.slice(0, 30);
    setInputValue(newValue);
    setCharacterCount(newValue.length);
    validateInput(newValue);
  };

  const validateInput = (value: string) => {
    if (value.length < 2) {
      setError('숙소명은 최소 2자 이상 작성해 주세요.');
    } else {
      setError(null);
    }
  };

  return (
    <StyledInputWrapper>
      <Form.Item rules={[{ required: true }]} label="숙소명" colon={false}>
        <StyledInput
          id="accommodationName"
          placeholder="숙소명을 입력해 주세요."
          type="text"
          minLength={2}
          maxLength={30}
          value={inputValue}
          onChange={handleInputChange}
          disabled={inputValue.length >= 30}
        />
        <StyledCharacterCountWrapper>
          {error && <StyledFormErrorMessage errorMessage={error} />}
          <StyledTextBox typography="body3" color="black500">
            {characterCount}/30
          </StyledTextBox>
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

const StyledInput = styled(Input)`
  height: 40px;
`;

const StyledCharacterCountWrapper = styled.div`
  height: 18px;
`;

const StyledFormErrorMessage = styled(FormErrorMessage)`
  float: left;
`;

const StyledTextBox = styled(TextBox)`
  float: right;
`;

export default AccommodationName;
