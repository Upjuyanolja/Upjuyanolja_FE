import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { server } from 'src/mocks/server';
import { HttpResponse, http } from 'msw';
import staticsData from '@assets/data/staticsData.json';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PointDetail } from '@pages/point-detail';
import { RecoilRoot } from 'recoil';

jest.mock('@ant-design/plots', () => ({
  Column: () => null,
  ColumnConfig: () => null,
}));
window.matchMedia = jest.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));
describe('Point-Detail', () => {
  const queryClient = new QueryClient();
  const DEFAULT_PAGE = 1;
  const DEFAULT_MENU_STATUS = 'total';
  const MENU_STATUS_USAGE = 'usage';
  const DEFAULT_DATE = new Date();
  const DEFAULT_YEAR = new Date().getFullYear();
  const DEFAULT_MONTH = new Date().getMonth() + 1;

  test('컴포넌트 렌더링 시 URL', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RecoilRoot>
            <PointDetail />
          </RecoilRoot>
        </BrowserRouter>
      </QueryClientProvider>,
    );
    const url = location.search;

    expect(url).toBe(
      `?year=${DEFAULT_YEAR}&month=${DEFAULT_MONTH}&menuStatus=${DEFAULT_MENU_STATUS}&pageNum=${DEFAULT_PAGE}`,
    );
  });

  test('Date Button 클릭시', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RecoilRoot>
            <PointDetail />
          </RecoilRoot>
        </BrowserRouter>
      </QueryClientProvider>,
    );
    const datePrevButton = screen.getByTestId('datePrevButton');
    const dateSpan = screen.getByTestId('dateSpan');

    // 현재 날짜 월 텍스트 확인
    expect(dateSpan.textContent).toBe(`${DEFAULT_YEAR} . ${DEFAULT_MONTH}월`);

    // 이전 버튼 클릭시
    act(() => {
      userEvent.click(datePrevButton);
    });

    const updatedDate = new Date(DEFAULT_DATE);
    updatedDate.setMonth(DEFAULT_DATE.getMonth() - 1);
    const updatedYear = updatedDate.getFullYear();
    const updatedMonth = updatedDate.getMonth() + 1;

    // 텍스트가 바뀌어져있는지 확인
    expect(dateSpan.textContent).toBe(`${updatedYear} . ${updatedMonth}월`);
    const url = location.search;

    // url 바뀌어져있는지 확인
    expect(url).toBe(
      `?year=${updatedYear}&month=${updatedMonth}&menuStatus=${DEFAULT_MENU_STATUS}&pageNum=${DEFAULT_PAGE}`,
    );
  });

  test('menu 버튼 클릭시', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RecoilRoot>
            <PointDetail />
          </RecoilRoot>
        </BrowserRouter>
      </QueryClientProvider>,
    );
    const menuStatusTotalButton = screen.getByTestId('menuStatusTotalButton');
    const menuStatusUsageButton = screen.getByTestId('menuStatusUsageButton');

    // 초기 상태 확인
    expect(menuStatusTotalButton).toHaveClass('ant-btn-primary');
    expect(menuStatusUsageButton).not.toHaveClass('ant-btn-primary');

    // Usage 버튼 클릭시
    act(() => {
      userEvent.click(menuStatusUsageButton);
    });
    expect(menuStatusTotalButton).not.toHaveClass('ant-btn-primary');
    expect(menuStatusUsageButton).toHaveClass('ant-btn-primary');

    // url 바뀌어져있는지 확인
    const url = location.search;

    expect(url).toBe(
      `?year=${DEFAULT_YEAR}&month=${DEFAULT_MONTH}&menuStatus=${MENU_STATUS_USAGE}&pageNum=${DEFAULT_PAGE}`,
    );
  });
});
