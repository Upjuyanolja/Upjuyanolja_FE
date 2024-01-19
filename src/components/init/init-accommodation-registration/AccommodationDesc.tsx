import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { ChangeEvent } from 'react';
import {
  ACCOMMODATION_DESC_MAX_LENGTH,
  ACCOMMODATION_DESC_MIN_LENGTH,
} from '@/constants/init/init-accommodation-registration';
import { TextBox } from '@components/text-box';
import { FormInstance } from 'antd/es/form/Form';

export const AccommodationDesc = ({ form }: { form: FormInstance }) => {
  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value.slice(0, ACCOMMODATION_DESC_MAX_LENGTH);
    form.setFieldValue('accommodation-desc', newValue);
  };

  return (
    <StyledInputWrapper>
      <TextBox typography="h4" fontWeight={700}>
        숙소 소개
      </TextBox>
      <Form.Item
        name="accommodation-desc"
        rules={[
          {
            min: ACCOMMODATION_DESC_MIN_LENGTH,
            message: `숙소 소개는 최소 ${ACCOMMODATION_DESC_MIN_LENGTH}자 이상 작성해 주세요.`,
          },
        ]}
      >
        <Input.TextArea
          id="accommodation-desc"
          placeholder="숙소를 소개해 주세요."
          minLength={ACCOMMODATION_DESC_MIN_LENGTH}
          showCount
          maxLength={ACCOMMODATION_DESC_MAX_LENGTH}
          style={{ height: 160, resize: 'none' }}
          onChange={handleTextAreaChange}
          data-testid="textarea-accommodation-desc"
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

  .ant-form-item-control {
    height: 190px;
  }
`;
