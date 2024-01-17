import {
  FLAT_DISCOUNT_TYPE,
  RATE_DISCOUNT_TYPE,
} from '@/constants/coupon-registration';
import { DiscountType } from '@components/coupon-registration/discount-type';
import { selectedDiscountTypeState } from '@stores/coupon-registration/atoms';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';

describe('쿠폰 타입 컴포넌트 테스트', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RecoilRoot>
            <DiscountType />
          </RecoilRoot>
        </BrowserRouter>
      </QueryClientProvider>,
    );
  });
  describe('쿠폰 할인 타입 테스트', () => {
    test('쿠폰 할인가 타입을 선택하면 selectedCouponType이 FlatType으로 변경된다', async () => {
      const button = await screen.findByTestId('flat-discount-type-button');
      await act(async () => {
        userEvent.click(button);
        setTimeout(() => {
          const selectedDiscountType = useRecoilValue(
            selectedDiscountTypeState,
          );
          expect(selectedDiscountType).toBe(FLAT_DISCOUNT_TYPE);
        }, 3000);
      });
    });

    test('쿠폰 할인율 타입을 선택하면 selectedCouponType이 RateType으로 변경된다', async () => {
      const button = await screen.findByTestId('rate-discount-type-button');
      await act(async () => {
        userEvent.click(button);
        setTimeout(() => {
          const selectedDiscountType = useRecoilValue(
            selectedDiscountTypeState,
          );
          expect(selectedDiscountType).toBe(RATE_DISCOUNT_TYPE);
        }, 3000);
      });
    });
  });

  describe('쿠폰 할인 가격 유효성 테스트', () => {
    test('할인 타입이 FLAT_DISCOUNT일 때 할인 가격 1000 미만 자리 숫자는 0으로 변환한다.', () => {
      const input = screen.getByTestId('discount-input');
      userEvent.click(screen.getByTestId('flat-discount-type-button'));
      fireEvent.change(input, {
        target: { value: '12345' },
      });
      setTimeout(() => {
        expect(input).toHaveValue('12,000');
      }, 3000);
    });
  });
});
