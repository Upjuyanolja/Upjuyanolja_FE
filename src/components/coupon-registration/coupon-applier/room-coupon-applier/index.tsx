import { TextBox } from '@components/text-box';
import { Checkbox, Input } from 'antd';
import styled from 'styled-components';
import { RoomCouponApplierProps } from './type';
import { InputChangeEvent } from '@/types/event';
import { useEffect, useState } from 'react';
import { isNumber } from '@/utils/is-number';
import { handleEnterKeyDown } from '@/utils/keydown/handleEnterKeyDown';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  discountValueState,
  groupQuantityValueState,
  isGroupQuantitySelectedState,
  pendingRoomDataListState,
  selectedDiscountTypeState,
} from '@stores/coupon-registration/atoms';
import {
  PendingRoomData,
  PendingRoomDataList,
} from '@components/coupon-registration/type';
import { removeNumberFormat } from '@/utils/Format/numberFormat';

export const RoomCouponApplier = ({
  roomName,
  index,
  roomId,
  roomPrice,
}: RoomCouponApplierProps) => {
  const selectedDiscountType = useRecoilValue(selectedDiscountTypeState);
  const [isItemQuantitySelected, setIsItemQuantitySelected] = useState(false);
  const [itemQuantityValue, setItemQuantityValue] = useState('0');
  const groupQuantityValue = useRecoilValue(groupQuantityValueState);
  const isGroupQuantitySelected = useRecoilValue(isGroupQuantitySelectedState);
  const [pendingRoomDataList, setPendingRoomDataList] = useRecoilState(
    pendingRoomDataListState,
  );
  const discountValue = useRecoilValue(discountValueState);
  const [inputValue, setInputValue] = useStaet('0');

  const handleChange = (e: InputChangeEvent) => {
    const inputValue = e.target.value;
    if (isNumber(inputValue)) {
      return setItemQuantityValue(inputValue);
    }
    if (!isNumber(inputValue) && inputValue.length < 1) {
      return setItemQuantityValue('');
    }
  };

  const existingItemIndex = pendingRoomDataList.findIndex(
    (item) => item.roomId === roomId,
  );

  const newItem: PendingRoomData = {
    isChecked: isItemQuantitySelected,
    roomId,
    roomName,
    discountType: selectedDiscountType.typeName,
    discount: Number(removeNumberFormat(discountValue)),
    quantity: Number(itemQuantityValue),
    eachPrice: roomPrice,
  };

  const handleCheckBox = () => {
    setIsItemQuantitySelected(!isItemQuantitySelected);
    setItemQuantityValue('0');

    //

    if (!isItemQuantitySelected) {
      setPendingRoomDataList((prev: PendingRoomDataList) => {
        if (existingItemIndex !== -1) {
          const newValues = [...prev];
          newValues[existingItemIndex] = newItem;
          return newValues;
        } else {
          return [...prev, newItem];
        }
      });
    } else {
      setPendingRoomDataList((prev: PendingRoomDataList) => {
        if (existingItemIndex !== -1) {
          return prev.filter((item) => item.roomId !== roomId);
        } else {
          return [...prev, newItem];
        }
      });
    }
  };

  useEffect(() => {
    console.log(pendingRoomDataList);
  }, [isItemQuantitySelected]);

  const handleBlur = () => {
    if (!itemQuantityValue) {
      return setItemQuantityValue('0');
    }
    const formattedValue = itemQuantityValue.replace(/^0+/, '');
    setItemQuantityValue(formattedValue);

    setPendingRoomDataList((prev: PendingRoomDataList) => {
      if (existingItemIndex !== -1) {
        const newValues = [...prev];
        newValues[existingItemIndex] = newItem;
        return newValues;
      } else {
        return [...prev, newItem];
      }
    });
  };

  useEffect(() => {
    if (!itemQuantityValue) {
      return;
    }
    console.log('2', pendingRoomDataList);
  }, [itemQuantityValue]);

  useEffect(() => {
    if (!isItemQuantitySelected) {
      return;
    }
  }, [isItemQuantitySelected]);

  useEffect(() => {
    if (!isGroupQuantitySelected || !isItemQuantitySelected) {
      return;
    }
    setItemQuantityValue(groupQuantityValue);
  }, [groupQuantityValue, isItemQuantitySelected]);

  useEffect(() => {
    setItemQuantityValue('0');
    setIsItemQuantitySelected(false);
  }, [selectedDiscountType]);

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
              : itemQuantityValue
          }
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
