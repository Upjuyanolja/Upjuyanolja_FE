import { fireEvent, render, screen } from '@testing-library/react';
import Footer from '.';
import React from 'react';

describe('버튼 클릭 테스트', () => {
  test('이용 약관을 클릭하면 https://terms.yanolja.com/basicTerms로 이동 한다', async () => {
    // 1. Arrange
    render(<Footer />);

    // 2. Act
    const btn1 = await screen.findByTestId('btn1');
    expect(btn1.getAttribute('href')).toBe(
      'https://terms.yanolja.com/basicTerms',
    );
    expect(btn1.textContent).toBe('이용 약관');
    fireEvent.click(btn1);

    // 3. Assert
    fireEvent.click(btn1);
    setTimeout(() => {
      expect(window.location.href).toBe('https://terms.yanolja.com/basicTerms');
    }, 5000);
  });

  test('개인 정보 처리 방침을 클릭하면 https://terms.yanolja.com/privacyUse로 이동한다', async () => {
    // 1. Arrange
    render(<Footer />);

    // 2. Act
    const btn2 = await screen.findByTestId('btn2');
    expect(btn2.getAttribute('href')).toBe(
      'https://terms.yanolja.com/privacyUse',
    );
    expect(btn2.textContent).toBe('개인정보 처리방침');
    fireEvent.click(btn2);

    // 3. Assert
    setTimeout(() => {
      expect(window.location.href).toBe('https://terms.yanolja.com/privacyUse');
    }, 5000);
  });
});
