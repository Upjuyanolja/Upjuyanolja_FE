import { TextBox } from '@components/text-box';
import { Checkbox, Input } from 'antd';
import styled from 'styled-components';
import { CommonQuantityCouponSetterProps } from './type';
import { InputChangeEvent } from '@/types/event';
import { useEffect, useState } from 'react';
import { handleEnterKeyDown } from '@/utils/keydown/handleEnterKeyDown';

export const CommonQuantityCouponSetter = ({
  selectedCouponType,
  setGroupQuantityValue,
  isGroupQuantitySelected,
  setIsGroupQuantitySelected,
}: CommonQuantityCouponSetterProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleAllQuantityValueChange = (e: InputChangeEvent) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    if (!inputValue) {
      setInputValue('0');
    }
  };

  useEffect(() => {
    const formattedValue = parseInt(inputValue);
    setGroupQuantityValue(formattedValue);
  }, [inputValue]);

  useEffect(() => {
    if (!isGroupQuantitySelected) {
      setGroupQuantityValue(0);
      setInputValue('0');
    }
  }, [isGroupQuantitySelected]);

  useEffect(() => {
    setIsGroupQuantitySelected(false);
    setGroupQuantityValue(0);
  }, [selectedCouponType]);

  return (
    <Container>
      <StyledCheckBoxWrap>
        <Checkbox
          id="checkboxAll"
          checked={isGroupQuantitySelected}
          onChange={() => setIsGroupQuantitySelected(!isGroupQuantitySelected)}
        />
        <label htmlFor="checkboxAll">
          <TextBox typography="h5" color="primaryHover" fontWeight="bold">
            수량 일괄 적용
          </TextBox>
        </label>
      </StyledCheckBoxWrap>
      <StyledInputWrap>
        <StyledInput
          size="small"
          maxLength={3}
          value={inputValue}
          onChange={handleAllQuantityValueChange}
          disabled={!isGroupQuantitySelected}
          onKeyDown={handleEnterKeyDown}
          onBlur={handleBlur}
        />
        <TextBox typography="body1" color="black900">
          장
        </TextBox>
      </StyledInputWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 18px;
`;

const StyledCheckBoxWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledInput = styled(Input)`
  width: 114px;
  height: 40px;
`;
