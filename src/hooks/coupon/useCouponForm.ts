import { Response } from '@/types/api';
import { isChar, isExceededLength, isNumber } from '@/utils/input/keyboard';
import { coupons, room } from '@api/coupon/type';
import { tableData } from '@components/coupon/table/type';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

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
  const [couponTableData, setCouponTableData] = useState<tableData[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const couponData = queryClient.getQueryData<AxiosResponse<Response<coupons>>>(
    ['getCoupon'],
  );

  useEffect(() => {
    if (couponData) processCouponTableData(couponData.data.data.rooms);
  }, [couponData]);

  const processCouponTableData = (data: room[]) => {
    const couponTableData = [];
    let key = -1;
    for (const room of data) {
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
      }
    }
    setCouponTableData(couponTableData);
  };

  const handleSelectStatus = (value: string) => {
    setSelectedStatus(value);
    const data = [...couponTableData];
    selectedRowKeys.map((key) => {
      if (!data[key].isSoldOut) data[key].status = value;
    });
    setCouponTableData(data);
  };

  const handleSelectRecord = (selectedRowKeys: number[]) => {
    const data = [...couponTableData];
    selectedRowKeys.map((key) => {
      if (!data[key].isSoldOut && selectedStatus !== '') {
        data[key].status = selectedStatus;
      }
    });
    setCouponTableData(data);
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleSelectCouponType = (value: string, key: number) => {
    const data = [...couponTableData];
    data[key].couponType = value;
    setCouponTableData(data);
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
      const data = [...couponTableData];
      data[key].dayLimit = parseInt(`${event.currentTarget.value}${event.key}`);
      setCouponTableData(data);
    }
  };
  return {
    couponTableData,
    handleSelectStatus,
    handleSelectRecord,
    handleSelectCouponType,
    handleChangeInput,
  };
};
