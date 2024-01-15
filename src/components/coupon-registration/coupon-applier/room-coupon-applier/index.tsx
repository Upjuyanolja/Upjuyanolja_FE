import { TextBox } from '@components/text-box';
import { Checkbox, Input } from 'antd';
import styled from 'styled-components';
import { RoomCouponApplierProps } from './type';
import { InputChangeEvent } from '@/types/event';
import { useEffect, useState } from 'react';
import { handleEnterKeyDown } from '@/utils/keydown/handleEnterKeyDown';

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
  const [itemQuantityValue, setItemQuantityValue] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleQuantityChange = () => {
    const newValue = itemQuantityValue;
    setPendingCouponDataList((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = { roomId, roomName, roomPrice, quantity: newValue };
      return newValues;
    });
  };

  const handleChange = (e: InputChangeEvent) => {
    setInputValue(e.target.value);
  };

  const handleCheckBox = () => {
    setIsItemQuantitySelected(!isItemQuantitySelected);
    setItemQuantityValue(0);
    handleQuantityChange();
  };

  const handleBlur = () => {
    if (!inputValue) {
      setInputValue('0');
      setItemQuantityValue(0);
    }
    const formattedValue = parseInt(inputValue);
    setItemQuantityValue(formattedValue);
  };

  useEffect(() => {
    if (!inputValue) {
      return;
    }
  }, [inputValue]);

  useEffect(() => {
    if (!itemQuantityValue) {
      return;
    }

    handleQuantityChange();
  }, [itemQuantityValue]);

  useEffect(() => {
    if (!isGroupQuantitySelected || !isItemQuantitySelected) {
      return;
    }

    if (isGroupQuantitySelected && isItemQuantitySelected) {
      const formattedValue = groupQuantityValue.toString();
      setInputValue(formattedValue);
    }
  }, [groupQuantityValue, isItemQuantitySelected]);

  useEffect(() => {
    setInputValue('0');
    setItemQuantityValue(0);
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
          value={inputValue}
          onChange={handleChange}
          disabled={isGroupQuantitySelected || !isItemQuantitySelected}
          onKeyDown={handleEnterKeyDown}
          onBlur={handleBlur}
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
