import { SideBar } from '@components/layout/side-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

describe('네비게이션', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  const queryClient = new QueryClient();
  test('렌더링 테스트', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </QueryClientProvider>,
    );
  });

  test('포인트 충전 버튼 클릭 시 포인트 충전 모달이 정상적으로 렌더링되는지 확인', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    const chargePointButton = await screen.findByTestId('charge-point-button');

    act(() => {
      userEvent.click(chargePointButton);
    });
    const modalText = await screen.findByText('포인트 충전');

    expect(modalText).toBeInTheDocument();
  });
});
