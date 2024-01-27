import { Switch, Form } from 'antd';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { TextBox } from '@components/text-box';

export const StatusContainer = ({
  defaultStatus,
}: {
  defaultStatus: 'SELLING' | 'STOP_SELLING' | undefined;
}) => {
  const [isOnSale, setIsOnSale] = useState(defaultStatus === 'SELLING');

  const handleInputChange = () => {
    setIsOnSale((prev) => !prev);
  };

  useEffect(() => {
    setIsOnSale(defaultStatus === 'SELLING');
  }, [defaultStatus]);

  if (!defaultStatus) return <></>;
  return (
    <StyledInputWrapper>
      <StyledDesc>
        <TextBox typography="h4" fontWeight={700}>
          객실 상태
        </TextBox>
      </StyledDesc>
      <StyledRow>
        <Form.Item name="status">
          <StyledSwitch onChange={handleInputChange} checked={isOnSale} />
        </Form.Item>
        <StyledTextBoxWrapper>
          <TextBox typography="body1" color="black900" fontWeight="normal">
            {isOnSale ? '판매 중' : '판매 중지'}
          </TextBox>
        </StyledTextBoxWrapper>
      </StyledRow>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 35px;

  .ant-form-item-control {
    width: 100%;
  }

  .ant-input {
    font-size: 16px;
  }
`;

const StyledTextBoxWrapper = styled.div`
  margin-bottom: 24px;
  margin-right: 12px;

  &:last-child {
    margin-right: 0;
  }
`;

const StyledRow = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDesc = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledSwitch = styled(Switch)`
  margin-right: 7px;
`;
