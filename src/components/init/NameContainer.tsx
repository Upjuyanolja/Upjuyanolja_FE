import { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { FormErrorMessage } from '@components/init/FormErrorMessage';
import { NameContainerProps } from './type';
import {
  ACCOMMODATION_NAME_MAX_LENGTH,
  ACCOMMODATION_NAME_MIN_LENGTH,
} from '@/constants/init/init-accommodation-registration';
import { NAME_REGEX } from '@/constants/init';
import { TextBox } from '@components/text-box';
import { useRecoilState } from 'recoil';
import { nameErrorMessage } from '@stores/init/atoms';

export const NameContainer = ({
  header,
  placeholder,
  form,
}: NameContainerProps) => {
  const [errorMessage, setErrorMessage] = useRecoilState(nameErrorMessage);

  const validateInput = ({ value }: { value: string }) => {
    if (value.length < ACCOMMODATION_NAME_MIN_LENGTH) {
      setErrorMessage(
        `${header}은 최소 ${ACCOMMODATION_NAME_MIN_LENGTH}자 이상 작성해 주세요.`,
      );
    } else {
      setErrorMessage('');
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.slice(0, ACCOMMODATION_NAME_MAX_LENGTH);
    if (!NAME_REGEX.test(newValue)) {
      if (header === '숙소명') form.setFieldValue('accommodation-name', '');
      else if (header === '객실명') form.setFieldValue('room-name', '');
      return;
    }
    validateInput({ value: newValue });
  };

  return (
    <StyledInputWrapper>
      <TextBox typography="h4" fontWeight={700}>
        {header}
      </TextBox>
      <Form.Item
        name={header === '숙소명' ? 'accommodation-name' : 'room-name'}
      >
        <Input
          id={header === '숙소명' ? 'accommodation-name' : 'room-name'}
          placeholder={placeholder}
          type="text"
          minLength={ACCOMMODATION_NAME_MIN_LENGTH}
          maxLength={ACCOMMODATION_NAME_MAX_LENGTH}
          style={{ height: 40, width: header === '객실명' ? '440px' : '' }}
          onChange={handleInputChange}
          status={errorMessage ? 'error' : ''}
          data-testid="input-name"
        />
      </Form.Item>
      <StyledErrorMessageWrapper data-testid="error-input-name">
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
