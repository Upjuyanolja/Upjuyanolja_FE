/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { SignInAgreement } from '.';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

const mockedUsedNavigate = jest.fn();

const data = [
  { id: 0, condition: '[필수]', title: '만 14세 이상입니다' },
  {
    id: 1,
    condition: '[선택]',
    title: '빨리잡아! 쿠폰센터 서비스 이용 약관',
  },
  {
    id: 2,
    condition: '[선택]',
    title: '빨리잡아! 쿠폰센터 개인정보 수집 및 이용 동의',
  },
  {
    id: 3,
    condition: '[선택]',
    title: '빨리잡아! 쿠폰센터 놀자 제 3자 정보 제공 동의',
  },
];

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

test('모두 동의 버튼 클릭 테스트', async () => {
  // 1. Arrange
  render(<SignInAgreement />);
  for (let i = 0; i < 4; i++) {
    const checkId = await screen.getByRole('checkbox', {
      name: `${data[i].condition} ${data[i].title}`,
    });
    expect(checkId).not.toBeChecked();
  }
  const allCheck = await screen.getByRole('checkbox', { name: '모두 동의' });
  expect(allCheck).not.toBeChecked();

  // 2. Act
  fireEvent.click(allCheck);
  expect(allCheck).toBeChecked();

  // 3. Assert
  for (let i = 0; i < 4; i++) {
    const checkId = await screen.getByRole('checkbox', {
      name: `${data[i].condition} ${data[i].title}`,
    });
    expect(checkId).toBeChecked();
  }
  const nextBtn = await screen.findByTestId('nextBtn');
  expect(nextBtn.textContent).toBe('다음');
  expect(nextBtn).not.toBeDisabled();
});

test('필수 버튼 클릭 테스트', async () => {
  // 1. Arrange
  render(<SignInAgreement />);
  for (let i = 0; i < 4; i++) {
    const checkId = await screen.getByRole('checkbox', {
      name: `${data[i].condition} ${data[i].title}`,
    });
    expect(checkId).not.toBeChecked();
  }
  const allCheck = await screen.getByRole('checkbox', { name: '모두 동의' });
  expect(allCheck).not.toBeChecked();
  const EssentialCheck = await screen.getByRole('checkbox', {
    name: '[필수] 만 14세 이상입니다',
  });

  // 2. Act
  fireEvent.click(EssentialCheck);
  expect(EssentialCheck).toBeChecked();

  // 3. Assert
  const nextBtn = await screen.findByTestId('nextBtn');
  expect(nextBtn).not.toBeDisabled();
});

test('선택 버튼 클릭 테스트', async () => {
  // 1. Arrange
  render(<SignInAgreement />);
  for (let i = 0; i < 4; i++) {
    const checkId = await screen.getByRole('checkbox', {
      name: `${data[i].condition} ${data[i].title}`,
    });
    expect(checkId).not.toBeChecked();
  }
  const allCheck = await screen.getByRole('checkbox', { name: '모두 동의' });
  expect(allCheck).not.toBeChecked();

  // 2. Act
  for (let i = 1; i < 4; i++) {
    const selectiveCheck = await screen.getByRole('checkbox', {
      name: `${data[i].condition} ${data[i].title}`,
    });
    fireEvent.click(selectiveCheck);
    expect(selectiveCheck).toBeChecked();
  }

  // 3. Assert
  const nextBtn = await screen.findByTestId('nextBtn');
  expect(nextBtn.textContent).toBe('다음');
  expect(nextBtn).toBeDisabled();
});

test('이전 버튼 클릭 테스트', async () => {
  // 1. Arrange
  render(<SignInAgreement />);
  for (let i = 0; i < 4; i++) {
    const checkId = await screen.getByRole('checkbox', {
      name: `${data[i].condition} ${data[i].title}`,
    });
    expect(checkId).not.toBeChecked();
  }
  const allCheck = await screen.getByRole('checkbox', { name: '모두 동의' });
  expect(allCheck).not.toBeChecked();

  // 2. Act
  const prevBtn = await screen.findByTestId('prevBtn');
  expect(prevBtn.textContent).toBe('이전');
  fireEvent.click(prevBtn);

  // 3. Assert
  setTimeout(() => {
    expect(window.location.pathname).toBe('/signin');
  }, 5000);
});

test('다음 버튼 클릭 테스트(모두 동의 버튼 눌러 활성화 된 경우)', async () => {
  // 1. Arrange
  render(<SignInAgreement />);
  for (let i = 0; i < 4; i++) {
    const checkId = await screen.getByRole('checkbox', {
      name: `${data[i].condition} ${data[i].title}`,
    });
    expect(checkId).not.toBeChecked();
  }
  const allCheck = await screen.getByRole('checkbox', { name: '모두 동의' });
  expect(allCheck).not.toBeChecked();

  // 2. Act
  fireEvent.click(allCheck);
  expect(allCheck).toBeChecked();

  // 3. Assert
  for (let i = 0; i < 4; i++) {
    const checkId = await screen.getByRole('checkbox', {
      name: `${data[i].condition} ${data[i].title}`,
    });
    expect(checkId).toBeChecked();
  }
  const nextBtn = await screen.findByTestId('nextBtn');
  expect(nextBtn.textContent).toBe('다음');
  expect(nextBtn).not.toBeDisabled();

  // 4. Act
  fireEvent.click(nextBtn);
  setTimeout(() => {
    expect(window.location.pathname).toBe('/signup');
  }, 5000);
});

test('다음 버튼 클릭 테스트(필수 버튼 눌러 활성화 된 경우)', async () => {
  // 1. Arrange
  render(<SignInAgreement />);
  for (let i = 0; i < 4; i++) {
    const checkId = await screen.getByRole('checkbox', {
      name: `${data[i].condition} ${data[i].title}`,
    });
    expect(checkId).not.toBeChecked();
  }
  const allCheck = await screen.getByRole('checkbox', { name: '모두 동의' });
  expect(allCheck).not.toBeChecked();

  // 2. Act
  for (let i = 1; i < 4; i++) {
    const selectiveCheck = await screen.getByRole('checkbox', {
      name: `${data[i].condition} ${data[i].title}`,
    });
    fireEvent.click(selectiveCheck);
    expect(selectiveCheck).toBeChecked();
  }

  // 3. Assert
  const nextBtn = await screen.findByTestId('nextBtn');
  expect(nextBtn.textContent).toBe('다음');
  expect(nextBtn).toBeDisabled();

  // 4. Act
  fireEvent.click(nextBtn);
  setTimeout(() => {
    expect(window.location.pathname).toBe('/signup');
  }, 5000);
});
