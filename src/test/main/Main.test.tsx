import { Main } from '@pages/main';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

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
});
