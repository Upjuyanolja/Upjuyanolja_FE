/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { SignInAgreement } from '.';
import React from 'react';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

// test('모두 동의 버튼 클릭 테스트', () => {});

// test('필수 버튼 클릭 테스트', () => {});

// test('선택 버튼 클릭 테스트', () => {});

test('이전 버튼 클릭 테스트', async () => {
  // 1. Arrange
  render(<SignInAgreement />);

  // 2. Act
  const prevBtn = await screen.findByTestId('prevBtn');
  expect(prevBtn.textContent).toBe('이전');
  fireEvent.click(prevBtn);

  // 3. Assert
  setTimeout(() => {
    expect(window.location.pathname).toBe('/signin');
  }, 5000);
});

// test('다음 버튼 클릭 테스트(모두 동의 버튼 눌러 활성화 된 경우)', () => {});

// test('다음 버튼 클릭 테스트(필수 버튼 눌러 활성화 된 경우)', () => {});
