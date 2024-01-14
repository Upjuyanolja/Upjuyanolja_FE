import { Response } from '@/types/api';
import { isChar, isExceededLength, isNumber } from '@/utils/input/keyboard';
import { coupons } from '@api/coupon/type';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { CouponData } from './type';
import { Modal, message } from 'antd';

/**
 * @description 쿠폰 관리 페이지 form 데이터를 다루는 hook
 * 
 * @returns
 *   couponTableData,
    handleSelectStatus,
    handleSelectRecord,
    handleSelectCouponType,
    handleChangeInput,
 */

export const useCouponForm = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [couponData, setCouponData] = useState<CouponData>({
    expiry: '',
    coupons: [],
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const queryClient = useQueryClient();
  const originCouponTableData = useRef<CouponData>();
  const data = queryClient.getQueryData<AxiosResponse<Response<coupons>>>([
    'getCoupon',
  ]);
  useEffect(() => {
    if (data) {
      processCouponTableData(data.data.data);
    }
  }, [data]);

  const processCouponTableData = (data: coupons) => {
    const couponTableData = [];
    const originData = [];
    let key = -1;
    for (const room of data.rooms) {
      for (let index = 0; index < room.coupons.length; index++) {
        key++;
        const coupon = room.coupons[index];
        const length = index === 0 ? room.coupons.length : 0;
        couponTableData.push({
          room: {
            name: room.roomName,
            price: room.roomPrice,
            id: room.roomId,
            length,
          },
          key,
          couponId: coupon.couponId,
          status: coupon.status,
          info: {
            name: coupon.couponName,
            appliedPrice: coupon.appliedPrice,
          },
          dayLimit: coupon.dayLimit,
          quantity: coupon.quantity,
          couponType: coupon.couponType,
          discount: coupon.discount,
          discountType: coupon.discountType,
          isSoldOut: coupon.status === 'SOLD_OUT',
        });
        originData.push({
          room: {
            name: room.roomName,
            price: room.roomPrice,
            id: room.roomId,
            length,
          },
          key,
          couponId: coupon.couponId,
          status: coupon.status,
          info: {
            name: coupon.couponName,
            appliedPrice: coupon.appliedPrice,
          },
          dayLimit: coupon.dayLimit,
          quantity: coupon.quantity,
          couponType: coupon.couponType,
          discount: coupon.discount,
          discountType: coupon.discountType,
          isSoldOut: coupon.status === 'SOLD_OUT',
        });
      }
    }
    setCouponData({ expiry: data.expiry, coupons: [...couponTableData] });
    originCouponTableData.current = {
      expiry: data.expiry,
      coupons: [...originData],
    };
  };

  const handleSelectStatus = (value: string) => {
    setSelectedStatus(value);
    const { expiry, coupons: data } = { ...couponData };
    selectedRowKeys.map((key) => {
      if (!data[key].isSoldOut) data[key].status = value;
    });
    setCouponData({ expiry, coupons: data });
  };

  const handleSelectRecord = (selectedRowKeys: number[]) => {
    const { expiry, coupons: data } = { ...couponData };
    selectedRowKeys.map((key) => {
      if (!data[key].isSoldOut && selectedStatus !== '') {
        data[key].status = selectedStatus;
      }
    });
    setCouponData({ expiry, coupons: data });
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleSelectCouponType = (value: string, key: number) => {
    const { expiry, coupons: data } = { ...couponData };
    data[key].couponType = value;
    setCouponData({ expiry, coupons: data });
  };

  const handleChangeInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
    key: number,
  ) => {
    if (
      isChar(event.key) ||
      isExceededLength(event.key, event.currentTarget.value, 2)
    ) {
      event.preventDefault();
      return;
    }
    if (isNumber(event.key)) {
      const { expiry, coupons: data } = { ...couponData };
      data[key].dayLimit = parseInt(`${event.currentTarget.value}${event.key}`);
      setCouponData({ expiry, coupons: data });
    }
  };

  const handleChangeDate = (date: string) => {
    const { coupons } = { ...couponData };
    setCouponData({ expiry: date, coupons });
  };

  const isModified = () => {
    return (
      JSON.stringify(originCouponTableData.current) !==
      JSON.stringify(couponData)
    );
  };

  const isSelectedRow = () => {
    return selectedRowKeys.length !== 0;
  };

  const findNotSoldOutData = (selectedRowKeys: number[]) => {
    for (let index = 0; index < selectedRowKeys.length; index++) {
      if (!couponData.coupons[index].isSoldOut) return true;
    }
    return false;
  };

  const handleDeleteButton = () => {
    if (!isSelectedRow()) {
      message.warning('삭제할 쿠폰을 먼저 선택하세요.');
      return;
    }
    if (isModified()) {
      message.warning('수정 중인 내용을 먼저 저장하세요.');
      return;
    }
    if (findNotSoldOutData(selectedRowKeys)) {
      Modal.confirm({
        title: '수량이 남아있는 쿠폰이 있습니다.',
        content: ' 삭제 후 복구할 수 없습니다. 삭제하시겠습니까?',
        cancelText: '취소',
        okText: '삭제',
        className: 'confirm-modal',
      });
    }
  };
  return {
    couponData,
    handleSelectStatus,
    handleSelectRecord,
    handleSelectCouponType,
    handleChangeInput,
    handleDeleteButton,
    isModified,
    handleChangeDate,
  };
};
