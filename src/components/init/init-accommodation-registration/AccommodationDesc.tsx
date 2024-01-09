import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { useEffect, useState } from 'react';
import { FormErrorMessage } from '@components/init/FormErrorMessage';
import { HandleTextAreaChangeProps } from './type';
import {
  ACCOMMODATION_DESC_MAX_LENGTH,
  ACCOMMODATION_DESC_MIN_LENGTH,
} from '@/constants/init/init-accommodation-registration';
import { ValidateInputProps } from '../type';
import { useRecoilState } from 'recoil';
import { userInputValueState } from '@stores/init/userInputValueState';
import { TextBox } from '@components/text-box';

export const AccommodationDesc = () => {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [userInputValue, setUserInputValue] =
    useRecoilState(userInputValueState);
  const [error, setError] = useState<string | null>(null);

  const handleTextAreaChange = ({ event }: HandleTextAreaChangeProps) => {
    const newValue = event.target.value.slice(0, ACCOMMODATION_DESC_MAX_LENGTH);
    setTextAreaValue(newValue);
    validateTextArea({ value: newValue });
    !error &&
      setUserInputValue((prevValue) => ({
        ...prevValue,
        description: textAreaValue,
      }));
  };

  useEffect(() => {
    console.log(userInputValue);
  }, [userInputValue]);

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
      <TextBox typography="h4" fontWeight={700}>
        숙소 소개
      </TextBox>
      <Input.TextArea
        id="accommodation-desc"
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
`;

const StyledErrorMessageWrapper = styled.div`
  height: 18px;
`;

const StyledFormErrorMessage = styled(FormErrorMessage)`
  float: left;
`;
