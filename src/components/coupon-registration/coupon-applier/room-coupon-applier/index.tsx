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
  determinedPriceState,
  discountValueState,
  groupQuantityValueState,
  isGroupQuantitySelectedState,
  isTermsCheckedState,
  pendingRoomDataListState,
  selectedDiscountTypeState,
} from '@stores/coupon-registration/atoms';
import {
  PendingRoomData,
  PendingRoomDataList,
} from '@components/coupon-registration/type';
import { removeNumberFormat } from '@/utils/Format/numberFormat';
import { calculatedCouponPoints } from '@/utils/discountCoupon';
import { FLAT_DISCOUNT_TYPE } from '@/constants/coupon-registration';
import { useParams } from 'react-router-dom';

export const RoomCouponApplier = ({
  roomName,
  index,
  roomId,
  roomPrice,
}: RoomCouponApplierProps) => {
  const selectedDiscountType = useRecoilValue(selectedDiscountTypeState);
  const [isItemQuantitySelected, setIsItemQuantitySelected] = useState(false);
  const [itemQuantityValue, setItemQuantityValue] = useState('');
  const [groupQuantityValue, setGroupQuantityValue] = useRecoilState(
    groupQuantityValueState,
  );
  const setDiscountValue = useSetRecoilState(discountValueState);
  const setIsGroupQuantitySelected = useSetRecoilState(
    isGroupQuantitySelectedState,
  );
  const isGroupQuantitySelected = useRecoilValue(isGroupQuantitySelectedState);
  const [pendingRoomDataList, setPendingRoomDataList] = useRecoilState(
    pendingRoomDataListState,
  );
  const setSelectedDiscountType = useSetRecoilState(selectedDiscountTypeState);
  const discountValue = useRecoilValue(discountValueState);
  const [inputValue, setInputValue] = useState('0');
  const determinedPrice = useRecoilValue(determinedPriceState);
  const formattedDeterminedPrice = Number(removeNumberFormat(determinedPrice));
  const setIsTermsCheckedState = useSetRecoilState(isTermsCheckedState);
  const setDeterminedPrice = useSetRecoilState(determinedPriceState);
  const { accommodationId } = useParams();

  const newItem: PendingRoomData = {
    isChecked: isItemQuantitySelected,
    roomId,
    roomName,
    discountType: selectedDiscountType.typeName,
    discount: Number(removeNumberFormat(discountValue)),
    quantity: Number(itemQuantityValue),
    roomPrice: roomPrice,
    eachPoint:
      calculatedCouponPoints(
        roomPrice,
        formattedDeterminedPrice,
        `${selectedDiscountType === FLAT_DISCOUNT_TYPE ? 'FLAT' : 'RATE'}`,
      ) * Number(itemQuantityValue),
  };

  const handleChange = (e: InputChangeEvent) => {
    const targetValue = e.target.value;
    if (isNumber(targetValue)) {
      return setInputValue(targetValue);
    }
    if (!isNumber(targetValue) && targetValue.length < 1) {
      return setInputValue('');
    }
  };

  const handleCheckBox = () => {
    setIsItemQuantitySelected(!isItemQuantitySelected);
    setItemQuantityValue('0');
    setInputValue('0');

    if (!isItemQuantitySelected) {
      setPendingRoomDataList((prev: PendingRoomDataList) =>
        updateRoomDataList(prev, newItem),
      );
    } else {
      setPendingRoomDataList((prev: PendingRoomDataList) =>
        removeRoomDataList(prev),
      );
    }
  };

  const handleBlur = () => {
    const formattedValue =
      inputValue.length > 1 ? inputValue.replace(/^0+/, '') : inputValue;
    setInputValue(formattedValue);
    setItemQuantityValue(formattedValue);

    if (!inputValue) {
      setInputValue('0');
      setItemQuantityValue('0');
    }
  };

  const updateRoomDataList = (
    prev: PendingRoomDataList,
    newItem: PendingRoomData,
  ) => {
    const newValues = [...prev];
    const index = newValues.findIndex((item) => item.roomId === newItem.roomId);

    if (index !== -1) {
      newValues[index] = newItem;
    } else {
      newValues.push(newItem);
    }

    newValues.sort((a, b) => a.roomId - b.roomId);
    return newValues;
  };

  const removeRoomDataList = (prev: PendingRoomDataList) => {
    const index = pendingRoomDataList.findIndex(
      (item) => item.roomId === roomId,
    );
    if (index !== -1) {
      return prev.filter((item) => item.roomId !== roomId);
    } else {
      return [...prev, newItem];
    }
  };

  useEffect(() => {
    setPendingRoomDataList([]);
  }, []);

  useEffect(() => {
    if (!accommodationId) {
      return;
    }

    setInputValue('0');
    setPendingRoomDataList([]);
    setDeterminedPrice('');
    setGroupQuantityValue('0');
    setIsGroupQuantitySelected(false);
    setIsItemQuantitySelected(false);
    setDiscountValue('');
    setSelectedDiscountType(FLAT_DISCOUNT_TYPE);
    setIsTermsCheckedState(false);
  }, [accommodationId]);

  useEffect(() => {
    if (itemQuantityValue === '' || !isItemQuantitySelected) {
      return;
    }
    setPendingRoomDataList((prev: PendingRoomDataList) =>
      updateRoomDataList(prev, newItem),
    );
  }, [itemQuantityValue, selectedDiscountType, determinedPrice]);

  useEffect(() => {
    if (!isGroupQuantitySelected || !isItemQuantitySelected) {
      return;
    }
    setInputValue(groupQuantityValue);
    setItemQuantityValue(groupQuantityValue);
  }, [groupQuantityValue, isItemQuantitySelected]);

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
