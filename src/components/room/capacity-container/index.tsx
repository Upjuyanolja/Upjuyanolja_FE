import { useState } from 'react';
import { InputNumber, Input } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';

export const CapacityContainer = () => {
  const [value, setValue] = useState<number | undefined>(undefined);

  const handleValueChange = (newValue?: number | null) => {
    if (typeof newValue == 'number') {
      setValue(newValue);
    } else {
      setValue(undefined);
    }
  };

  return (
    <StyledRow>
      <StyledTextBoxWrapper>
        <TextBox typography="body1" color="black900" fontWeight="normal">
          기준 인원
        </TextBox>
      </StyledTextBoxWrapper>
      <StyledInputNumber
        min={1}
        max={15}
        defaultValue={1}
        formatter={(value) => `${value || ''}`}
        value={value}
      />
      <StyledTextBoxWrapper>
        <TextBox typography="body1" color="black900" fontWeight="normal">
          명
        </TextBox>
      </StyledTextBoxWrapper>
    </StyledRow>
  );
};

const StyledInputNumber = styled(InputNumber)`
  display: flex;
  width: 90px;
  height: 40px;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  margin-right: 4px;
`;

const StyledTextBoxWrapper = styled.div`
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
  }
`;

const StyledInput = styled(Input)`
  width: 22px;
  height: 20px;
  font-size: 16px;
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
`;
