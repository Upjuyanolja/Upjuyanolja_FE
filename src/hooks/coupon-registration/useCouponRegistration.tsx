import { RESPONSE_CODE } from '@/constants/api';
import {
  useBuyCoupon,
  useGetCouponRoomList,
} from '@queries/coupon-registration';
import { getCouponRoomDataListState } from '@stores/coupon-registration/atoms';
import { message, Modal } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export const useCouponRegistration = () => {
  const { accommodationId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setGetCouponRoomList = useSetRecoilState(getCouponRoomDataListState);

  const {
    data: couponRoomListData,
    isLoading: isGetCouponRoomListLoading,
    isError: isGetCouponRoomListError,
    refetch: isGetCouponRoomListRefetch,
  } = useGetCouponRoomList(accommodationId as string, {
    select(data) {
      setGetCouponRoomList(data.data);
      return data.data;
    },
  });

  const { mutate: buyCoupon } = useBuyCoupon({
    onSuccess() {
      message.success({
        content: '쿠폰을 구매하였습니다.',
        className: 'coupon-message',
      });
    },
    onError(error) {
      const errorCode = error.response?.data.code;

      handleErrorResponse(errorCode);
    },
  });

  const handleErrorResponse = (errorCode: number | undefined) => {
    switch (errorCode) {
      case RESPONSE_CODE.INSUFFICIENT_POINT_BALANCE:
        return Modal.confirm({
          title: '포인트 잔액이 부족합니다',
          content: '포인트 충전을 하시겠습니까?',
          okText: '충전',
          cancelText: '취소',
          className: 'confirm-modal',
          onOk: () => setIsModalOpen(true),
        });
      case RESPONSE_CODE.NOT_FOUND_ACCOMMODATION_ID:
        return message.error('요청을 실패했습니다. 관리자에게 문의해주세요.');
      default:
        return message.error('요청에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return {
    couponRoomListData,
    isGetCouponRoomListError,
    buyCoupon,
    isGetCouponRoomListLoading,
    isModalOpen,
    setIsModalOpen,
    isGetCouponRoomListRefetch,
  };
};
