import { ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { NameContainerProps } from './type';
import {
  ACCOMMODATION_NAME_MAX_LENGTH,
  ACCOMMODATION_NAME_MIN_LENGTH,
} from '@/constants/init/init-accommodation-registration';
import { NAME_REGEX } from '@/constants/init';
import { TextBox } from '@components/text-box';

export const NameContainer = ({
  header,
  placeholder,
  form,
  isSameRoomName,
}: NameContainerProps) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.slice(0, ACCOMMODATION_NAME_MAX_LENGTH);
    const cleanedStringValue = newValue.replace(NAME_REGEX, '');

    if (header === '숙소명')
      form.setFieldValue('accommodation-name', cleanedStringValue);
    else if (header === '객실명')
      form.setFieldValue('room-name', cleanedStringValue);
  };

  return (
    <StyledInputWrapper>
      <TextBox typography="h4" fontWeight={700}>
        {header}
      </TextBox>
      <Form.Item
        name={header === '숙소명' ? 'accommodation-name' : 'room-name'}
        rules={[
          {
            min: ACCOMMODATION_NAME_MIN_LENGTH,
            message: `${header}은 최소 ${ACCOMMODATION_NAME_MIN_LENGTH}자 이상 작성해 주세요.`,
          },
        ]}
      >
        <Input
          id={header === '숙소명' ? 'accommodation-name' : 'room-name'}
          placeholder={placeholder}
          type="text"
          minLength={ACCOMMODATION_NAME_MIN_LENGTH}
          maxLength={ACCOMMODATION_NAME_MAX_LENGTH}
          style={{ height: 40, width: header === '객실명' ? '440px' : '' }}
          onChange={handleInputChange}
          data-testid="input-name"
          status={isSameRoomName ? 'error' : ''}
        />
      </Form.Item>
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
