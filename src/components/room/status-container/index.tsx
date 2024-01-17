import { Switch, Form } from 'antd';
import { useState } from 'react';
import { styled } from 'styled-components';
import { TextBox } from '@components/text-box';

export const StatusContainer = () => {
  const [isOnSale, setIsOnSale] = useState(true);

  const handleInputChange = (isOnSale: boolean) => {
    setIsOnSale(!isOnSale);
    return;
  };

  return (
    <StyledInputWrapper>
      <StyledDesc>
        <TextBox typography="h4" fontWeight={700}>
          객실 상태
        </TextBox>
      </StyledDesc>
      <StyledRow>
        <Form.Item name="status">
          <Switch defaultChecked={isOnSale} onChange={handleInputChange} />
        </Form.Item>
        <StyledTextBoxWrapper>
          <TextBox typography="body1" color="black900" fontWeight="normal">
            판매 중
          </TextBox>
        </StyledTextBoxWrapper>
      </StyledRow>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
  position: relative;

  .ant-form-item-header {
    header {
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

const StyledTextBoxWrapper = styled.div`
  margin-right: 12px;

  &:last-child {
    margin-right: 0;
  }
`;

const StyledRow = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 8;
`;

const StyledDesc = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;
