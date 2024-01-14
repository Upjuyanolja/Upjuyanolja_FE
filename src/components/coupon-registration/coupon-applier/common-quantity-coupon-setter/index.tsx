import { TextBox } from '@components/text-box';
import { Checkbox, Input } from 'antd';
import styled from 'styled-components';
import { CommonQuantityCouponSetterProps } from './type';
import { InputChangeEvent } from '@/types/event';
import { useEffect } from 'react';
import { isNumber } from '@/utils/is-number';

export const CommonQuantityCouponSetter = ({
  selectedCouponType,
  groupQuantityValue,
  setGroupQuantityValue,
  isGroupQuantitySelected,
  setIsGroupQuantitySelected,
}: CommonQuantityCouponSetterProps) => {
  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };
  const handleAllQuantityValueChange = (e: InputChangeEvent) => {
    const formattedValue = e.target.value;
    if (!isNumber(formattedValue)) {
      return;
    }
    setGroupQuantityValue(formattedValue);
  };

  useEffect(() => {
    if (!isGroupQuantitySelected) {
      setGroupQuantityValue('0');
    }
  }, [isGroupQuantitySelected]);

  useEffect(() => {
    setIsGroupQuantitySelected(false);
    setGroupQuantityValue('0');
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
          value={groupQuantityValue || ''}
          onChange={handleAllQuantityValueChange}
          disabled={!isGroupQuantitySelected}
          onKeyDown={handleEnterKeyDown}
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
