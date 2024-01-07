import { Main } from '@pages/main';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { server } from 'src/mocks/server';
import { HttpResponse, http } from 'msw';
import staticsData from '@assets/data/staticsData.json';

jest.mock('@ant-design/plots', () => ({
  Column: () => null,
  ColumnConfig: () => null,
}));

describe('Main', () => {
  test('쿠폰 만들기 버튼 클릭 시 쿠폰 만들기 페이지로 이동한다', () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>,
    );
    const navigateButton = screen.getByTestId('navigate-coupon-registration');
    act(() => {
      userEvent.click(navigateButton);
    });
    expect(window.location.pathname).toBe('/coupon-registration');
  });
  test('쿠폰 관리 바로가기 버튼 클릭 시 쿠폰 관리 페이지로 이동한다', () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>,
    );
    const navigateButton = screen.getByTestId('navigate-coupon');
    act(() => {
      userEvent.click(navigateButton);
    });
    expect(window.location.pathname).toBe('/coupon');
  });
  test('서버로부터 쿠폰 사용량을 응답 받으면 컴포넌트에 쿠폰 사용량이 출력된다', async () => {
    server.use(
      http.get('/api/coupons/backoffice/statistics', () => {
        return HttpResponse.json(staticsData, { status: 200 });
      }),
    );
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>,
    );
    const staticsValue = screen.getByTestId('발행 쿠폰(A)');
    if (!staticsValue.textContent) {
      expect(staticsValue.textContent).toBeInTheDocument();
      return;
    }
    const value = parseInt(staticsValue.textContent);
    expect(value).toBeGreaterThanOrEqual(0);
  });
});
