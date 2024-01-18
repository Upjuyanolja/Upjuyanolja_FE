import { TextBox } from '@components/text-box';
import { Checkbox, Input } from 'antd';
import styled from 'styled-components';
import { InputChangeEvent } from '@/types/event';
import { useEffect, useState } from 'react';
import { handleEnterKeyDown } from '@/utils/keydown/handleEnterKeyDown';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  groupQuantityValueState,
  isGroupQuantitySelectedState,
} from '@stores/coupon-registration/atoms';
import { isNumber } from '@/utils/isNumber';

export const CommonQuantityCouponSetter = () => {
  const setGroupQuantityValue = useSetRecoilState(groupQuantityValueState);
  const [isGroupQuantitySelected, setIsGroupQuantitySelected] = useRecoilState(
    isGroupQuantitySelectedState,
  );
  const [inputValue, setInputValue] = useState('0');

  const handleChange = (e: InputChangeEvent) => {
    const targetValue = e.target.value;
    if (isNumber(targetValue)) {
      return setInputValue(targetValue);
    }
    if (!isNumber(targetValue) && targetValue.length < 1) {
      return setInputValue('');
    }
  };

  const handleBlur = () => {
    const formattedValue =
      inputValue.length > 1 ? inputValue.replace(/^0+/, '') : inputValue;

    setInputValue(formattedValue);
    setGroupQuantityValue(formattedValue);

    if (!inputValue) {
      setInputValue('0');
      setGroupQuantityValue('0');
      return;
    }
  };

  useEffect(() => {
    if (!isGroupQuantitySelected) {
      setInputValue('0');
      setGroupQuantityValue('0');
    }
  }, [isGroupQuantitySelected]);

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
          value={inputValue}
          onChange={handleChange}
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
