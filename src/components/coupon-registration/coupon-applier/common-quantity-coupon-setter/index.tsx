import { TextBox } from '@components/text-box';
import { Checkbox, Input } from 'antd';
import styled from 'styled-components';
import { InputChangeEvent } from '@/types/event';
import { useEffect } from 'react';
import { handleEnterKeyDown } from '@/utils/keydown/handleEnterKeyDown';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  groupQuantityValueState,
  isGroupQuantitySelectedState,
  selectedDiscountTypeState,
} from '@stores/coupon-registration/atoms';

export const CommonQuantityCouponSetter = () => {
  const selectedDiscountType = useRecoilValue(selectedDiscountTypeState);
  const [groupQuantityValue, setGroupQuantityValue] = useRecoilState(
    groupQuantityValueState,
  );
  const [isGroupQuantitySelected, setIsGroupQuantitySelected] = useRecoilState(
    isGroupQuantitySelectedState,
  );

  const handleAllQuantityValueChange = (e: InputChangeEvent) => {
    const formattedValue = parseInt(e.target.value);
    setGroupQuantityValue(formattedValue);
  };

  const handleBlur = () => {
    if (!groupQuantityValue) {
      setGroupQuantityValue(0);
    }
  };

  useEffect(() => {
    if (!isGroupQuantitySelected) {
      setGroupQuantityValue(0);
    }
  }, [isGroupQuantitySelected]);

  useEffect(() => {
    setIsGroupQuantitySelected(false);
    setGroupQuantityValue(0);
  }, [selectedDiscountType]);

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
          defaultValue={0}
          value={groupQuantityValue}
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
