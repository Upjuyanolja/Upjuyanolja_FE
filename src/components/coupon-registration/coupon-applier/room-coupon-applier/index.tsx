import { TextBox } from '@components/text-box';
import { Checkbox, Input } from 'antd';
import styled from 'styled-components';
import { RoomCouponApplierProps } from './type';
import { InputChangeEvent } from '@/types/event';
import { useEffect, useState } from 'react';
import { isNumber } from '@/utils/is-number';

export const RoomCouponApplier = ({
  roomName,
  index,
  roomId,
  roomPrice,
  setPendingCouponDataList,
  isGroupQuantitySelected,
  groupQuantityValue,
  selectedCouponType,
}: RoomCouponApplierProps) => {
  const [isItemQuantitySelected, setIsItemQuantitySelected] = useState(false);
  const [inputValue, setInputValue] = useState('0');

  const handleQuantityChange = () => {
    const newValue = inputValue;
    setPendingCouponDataList((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = { roomId, roomName, roomPrice, quantity: newValue };
      return newValues;
    });
  };

  const handleChange = (e: InputChangeEvent) => {
    if (!isNumber(parseInt(e.target.value))) {
      return;
    }
    setInputValue(e.target.value);
  };

  const handleFocus = () => {
    if (inputValue === '0') {
      setInputValue('0');
    }
  };

  const handleCheckBox = () => {
    setIsItemQuantitySelected(!isItemQuantitySelected);
    setInputValue('0');
  };

  useEffect(() => {
    handleQuantityChange();
  }, [inputValue]);

  useEffect(() => {
    if (isGroupQuantitySelected) {
      if (isItemQuantitySelected) {
        setInputValue(groupQuantityValue);
      }
    }
  }, [groupQuantityValue, isItemQuantitySelected]);

  useEffect(() => {
    setInputValue('0');
    setIsItemQuantitySelected(false);
  }, [selectedCouponType]);

  return (
    <Container>
      <StyledLeftWrap>
        <Checkbox
          id={`checkbox${index}`}
          checked={isItemQuantitySelected}
          onChange={handleCheckBox}
        />
        <label htmlFor={`checkbox${index}`}>
          <TextBox typography="h5" fontWeight="bold" color="black900">
            {roomName}
          </TextBox>
        </label>
      </StyledLeftWrap>
      <StyledRightWrap>
        <StyledInput
          size="small"
          maxLength={3}
          value={
            isGroupQuantitySelected && isItemQuantitySelected
              ? groupQuantityValue
              : inputValue
          }
          onChange={handleChange}
          disabled={isGroupQuantitySelected || !isItemQuantitySelected}
          onFocus={handleFocus}
        />
        <TextBox typography="body1" color="black900">
          장
        </TextBox>
      </StyledRightWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLeftWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const StyledRightWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledInput = styled(Input)<{ ref?: React.RefObject<HTMLInputElement> }>`
  width: 114px;
  height: 40px;
`;
