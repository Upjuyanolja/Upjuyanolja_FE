import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { ChangeEvent, useState } from 'react';
import { FormErrorMessage } from '@components/init/FormErrorMessage';
import {
  ACCOMMODATION_DESC_MAX_LENGTH,
  ACCOMMODATION_DESC_MIN_LENGTH,
} from '@/constants/init/init-accommodation-registration';
import { ValidateInput } from '../type';

import { TextBox } from '@components/text-box';
import { useRecoilState } from 'recoil';
import { descErrorMessage } from '@stores/init/atoms';

export const AccommodationDesc = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [errorMessage, setErrorMessage] = useRecoilState(descErrorMessage);

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value.slice(0, ACCOMMODATION_DESC_MAX_LENGTH);
    setTextAreaValue(newValue);
    validateTextArea({ value: newValue });
  };

  const validateTextArea = ({ value }: ValidateInput) => {
    if (value.length < ACCOMMODATION_DESC_MIN_LENGTH) {
      setErrorMessage(
        `숙소 소개는 최소 ${ACCOMMODATION_DESC_MIN_LENGTH}자 이상 작성해 주세요.`,
      );
    } else {
      setErrorMessage('');
    }
  };

  return (
    <StyledInputWrapper>
      <TextBox typography="h4" fontWeight={700}>
        숙소 소개
      </TextBox>
      <Form.Item name="accommodation-desc">
        <Input.TextArea
          id="accommodation-desc"
          placeholder="숙소를 소개해 주세요."
          minLength={ACCOMMODATION_DESC_MIN_LENGTH}
          showCount
          maxLength={ACCOMMODATION_DESC_MAX_LENGTH}
          disabled={textAreaValue.length >= ACCOMMODATION_DESC_MAX_LENGTH}
          style={{ height: 160, resize: 'none' }}
          onChange={handleTextAreaChange}
          status={errorMessage ? 'error' : ''}
          data-testid="textarea-accommodation-desc"
        />
      </Form.Item>
      <StyledErrorMessageWrapper data-testid="error-textarea-accommodation-desc">
        {errorMessage && <StyledFormErrorMessage errorMessage={errorMessage} />}
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
