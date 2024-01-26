import { RESPONSE_CODE } from '@/constants/api';
import { ROUTES } from '@/constants/routes';
import {
  useBuyCoupon,
  useGetCouponRoomList,
} from '@queries/coupon-registration';
import {
  getCouponRoomDataListState,
  isActivityResetCouponState,
} from '@stores/coupon-registration/atoms';
import { useQueryClient } from '@tanstack/react-query';
import { message, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

export const useCouponRegistration = () => {
  const { accommodationId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setGetCouponRoomList = useSetRecoilState(getCouponRoomDataListState);
  const navigate = useNavigate();
  const [isActivityResetCoupon, setIsActivityResetCoupon] = useRecoilState(
    isActivityResetCouponState,
  );
  const queryClient = useQueryClient();

  const {
    data: couponRoomListData,
    isLoading: isGetCouponRoomListLoading,
    isError: isGetCouponRoomListError,
    refetch: isGetCouponRoomListRefetch,
    isFetching: isGetCouponRoomListFetching,
  } = useGetCouponRoomList(accommodationId as string, {
    select(data) {
      setGetCouponRoomList(data.data);
      return data.data;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { mutate: buyCoupon } = useBuyCoupon({
    onSuccess() {
      queryClient.invalidateQueries(['getPointTotal']);
      return Modal.confirm({
        content: '쿠폰이 발급되었습니다.',
        okText: '새 쿠폰 만들기',
        cancelText: '발급한 쿠폰 보기',
        className: 'confirm-modal',
        onOk: () => {
          setIsActivityResetCoupon(!isActivityResetCoupon);
          navigate(`/${accommodationId}${ROUTES.COUPON_REGISTRATION}`);
        },
        onCancel: () => navigate(`/${accommodationId}${ROUTES.COUPON}`),
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
    buyCoupon,
    isGetCouponRoomListLoading,
    isGetCouponRoomListError,
    isGetCouponRoomListFetching,
    isGetCouponRoomListRefetch,
    isModalOpen,
    setIsModalOpen,
  };
};
