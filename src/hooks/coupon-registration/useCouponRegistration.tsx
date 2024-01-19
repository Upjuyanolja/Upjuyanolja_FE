import { RESPONSE_CODE } from '@/constants/api';
import {
  useBuyCoupon,
  useGetCouponRoomList,
} from '@queries/coupon-registration';
import { message, Modal } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const useCouponRegistration = () => {
  const { accommodationId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: couponRoomListData, isError: isGetCouponRoomListError } =
    useGetCouponRoomList(accommodationId as string, {
      select(data) {
        return data.data.data;
      },
    });

  const { mutate: buyCoupon } = useBuyCoupon({
    onSuccess() {
      message.success({
        content: '쿠폰을 구매하였습니다.',
      });
    },
    onError(error) {
      const errorCode = error.response?.data.code;

      handleErrorResponse(errorCode);
    },
  });

  const handleErrorResponse = (errorCode: number | undefined) => {
    switch (errorCode) {
      case RESPONSE_CODE.NOT_ENOUGH_POINT:
        return Modal.confirm({
          title: '포인트 잔액이 부족합니다',
          content: '포인트 충전을 하시겠습니까?',
          okText: '충전',
          cancelText: '취소',
          className: 'confirm-modal',
          onOk: () => setIsModalOpen(true),
        });
      default:
        return message.error('요청에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return {
    couponRoomListData,
    isGetCouponRoomListError,
    buyCoupon,
    isModalOpen,
    setIsModalOpen,
  };
};
