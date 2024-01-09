import { fireEvent, render, screen } from '@testing-library/react';
import SignUpSuccess from '.';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

test('로그인 하러 가기 버튼 테스트', async () => {
  // 1. Arrange
  render(
    <BrowserRouter>
      <SignUpSuccess></SignUpSuccess>
    </BrowserRouter>,
  );

  // 2. Act
  const btn = await screen.findByTestId('btn');
  expect(btn.textContent).toBe('로그인 하러 가기');
  fireEvent.click(btn);

  // 3. Assert
  setTimeout(() => {
    expect(window.location.pathname).toBe('/signin');
  }, 5000);
});
