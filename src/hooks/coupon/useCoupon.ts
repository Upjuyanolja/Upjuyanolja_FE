import { useDeleteCoupon, useEditCoupon, useGetCoupon } from '@queries/coupon';
import { Modal, message } from 'antd';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { CouponData } from './type';
import {
  CouponDeleteParams,
  CouponEditParams,
  EditCoupon,
  coupons,
} from '@api/coupon/type';
/**
 * @description 쿠폰 관리 페이지 로직을 다루는 hook
 * 
 * @returns
 *  data,
    isGetCouponError,
    deleteCoupon,
    couponData,
    handleSelectStatus,
    handleSelectRecord,
    handleSelectCouponType,
    handleChangeInput,
    handleDeleteButton,
    isModified,
    handleChangeDate,
 */

export const useCoupon = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [couponData, setCouponData] = useState<CouponData>({
    expiry: '',
    coupons: [],
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const originCouponTableData = useRef<CouponData>();

  const {
    data,
    isError: isGetCouponError,
    remove: getCouponRemove,
  } = useGetCoupon({
    select(data) {
      return data.data.data;
    },
  });

  const { mutate: deleteCoupon } = useDeleteCoupon({
    onSuccess() {
      message.success({
        content: '삭제되었습니다',
        className: 'coupon-message',
      });
      getCouponRemove();
    },
    onError(error) {
      if (error instanceof AxiosError)
        message.error('요청에 실패했습니다 잠시 후 다시 시도해주세요');
    },
  });

  const { mutate: editCoupon } = useEditCoupon({
    onSuccess() {
      message.success({
        content: '저장되었습니다',
        className: 'coupon-message',
      });
      getCouponRemove();
    },
    onError(error) {
      if (error instanceof AxiosError)
        message.error('요청에 실패했습니다 잠시 후 다시 시도해주세요');
    },
  });

  useEffect(() => {
    if (data) {
      processCouponTableData(data);
      setSelectedStatus('');
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
    // 수정 예정
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
      const key = selectedRowKeys[index];
      if (!couponData.coupons[key].isSoldOut) return true;
    }
    return false;
  };

  const processDeleteData = (selectedRowKeys: number[]) => {
    const rooms: { couponId: number }[][] = [];
    for (let index = 0; index < selectedRowKeys.length; index++) {
      const key = selectedRowKeys[index];
      const { room, couponId } = couponData.coupons[key];
      if (!rooms[room.id]) {
        rooms[room.id] = [];
      }
      rooms[room.id].push({ couponId });
    }
    const data: CouponDeleteParams = {
      accommodationId: 1,
      rooms: [],
    };
    for (let index = 0; index < rooms.length; index++) {
      if (rooms[index]) {
        const roomsData = {
          roomId: index,
          coupons: rooms[index],
        };
        data.rooms.push(roomsData);
      }
    }
    return data;
  };

  const processEditData = () => {
    const rooms: EditCoupon[][] = [];
    for (let index = 0; index < couponData.coupons.length; index++) {
      const {
        room,
        couponId,
        status,
        discount,
        discountType,
        dayLimit,
        couponType,
      } = couponData.coupons[index];
      if (!rooms[room.id]) {
        rooms[room.id] = [];
      }
      rooms[room.id].push({
        couponId,
        status,
        discount,
        discountType,
        dayLimit,
        couponType,
      });
    }
    const data: CouponEditParams = {
      accommodationId: 1,
      expiry: couponData.expiry,
      rooms: [],
    };
    for (let index = 0; index < rooms.length; index++) {
      if (rooms[index]) {
        data.rooms.push({
          roomId: index,
          coupons: rooms[index],
        });
      }
    }
    return data;
  };

  const handleDeleteButton = () => {
    if (!isSelectedRow()) {
      message.warning('삭제할 쿠폰을 먼저 선택하세요');
      return;
    }
    if (isModified()) {
      message.warning('수정 중인 내용을 먼저 저장하세요');
      return;
    }
    if (findNotSoldOutData(selectedRowKeys)) {
      Modal.confirm({
        title: '수량이 남아있는 쿠폰이 있습니다.',
        content: ' 삭제 후 복구할 수 없습니다. 삭제하시겠습니까?',
        cancelText: '취소',
        okText: '삭제',
        className: 'confirm-modal',
        onOk: () => {
          deleteCoupon(processDeleteData(selectedRowKeys));
        },
      });
      return;
    }
    Modal.confirm({
      title: '삭제된 쿠폰 정보는 되돌릴 수 없습니다.',
      content: ' 삭제하시겠습니까?',
      cancelText: '취소',
      okText: '삭제',
      className: 'confirm-modal',
      onOk: () => {
        deleteCoupon(processDeleteData(selectedRowKeys));
      },
    });
  };

  const handleEditButton = () => {
    Modal.confirm({
      title:
        '수정사항은 새로운 예약에만 적용되며,\n 기존 예약은 변경되지 않습니다.',
      content: ' 저장하시겠습니까?',
      cancelText: '취소',
      okText: '저장',
      className: 'confirm-modal',
      onOk: () => {
        editCoupon(processEditData());
      },
    });
  };

  return {
    data,
    isGetCouponError,
    deleteCoupon,
    couponData,
    handleSelectStatus,
    handleSelectRecord,
    handleSelectCouponType,
    handleChangeInput,
    handleDeleteButton,
    isModified,
    handleChangeDate,
    handleEditButton,
  };
};
