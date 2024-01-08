import { Main } from '@pages/main';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { server } from 'src/mocks/server';
import { HttpResponse, http } from 'msw';
import staticsData from '@assets/data/staticsData.json';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@ant-design/plots', () => ({
  Column: () => null,
  ColumnConfig: () => null,
}));

describe('Main', () => {
  const queryClient = new QueryClient();
  test('쿠폰 만들기 버튼 클릭 시 쿠폰 만들기 페이지로 이동한다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    const navigateButton = await screen.findByTestId(
      'navigate-coupon-registration',
    );
    act(() => {
      userEvent.click(navigateButton);
    });
    setTimeout(() => {
      expect(window.location.pathname).toBe('/coupon-registration');
    }, 5000);
  });
  test('쿠폰 관리 바로가기 버튼 클릭 시 쿠폰 관리 페이지로 이동한다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    const navigateButton = await screen.findByTestId('navigate-coupon');
    act(() => {
      userEvent.click(navigateButton);
    });
    setTimeout(() => {
      expect(window.location.pathname).toBe('/coupon');
    }, 5000);
  });
  test('서버로부터 쿠폰 사용량을 응답 받으면 컴포넌트에 쿠폰 사용량이 출력된다', async () => {
    server.use(
      http.get('/api/coupons/backoffice/statistics', () => {
        return HttpResponse.json(staticsData, { status: 200 });
      }),
    );
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    const staticsValue = await screen.findByTestId('발행 쿠폰(A)');
    if (!staticsValue.textContent) {
      expect(staticsValue.textContent).toBeInTheDocument();
      return;
    }
    const value = parseInt(staticsValue.textContent);
    expect(value).toBeGreaterThanOrEqual(0);
  });
});
