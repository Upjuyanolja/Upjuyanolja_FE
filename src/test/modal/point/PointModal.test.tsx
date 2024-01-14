import { fireEvent, render, screen } from '@testing-library/react';

import PointModalTestComp from '.';

describe('PointModal', () => {
  test('input 숫자 입력시 포맷 테스트', async () => {
    await render(<PointModalTestComp />);
    const input = await screen.getByTestId('input');

    await fireEvent.change(input, { target: { value: '1234567' } });

    expect(input).toHaveValue('1,234,567');
  });

  test('input 숫자가 아닌 문자 입력 테스트', async () => {
    await render(<PointModalTestComp />);
    const input = await screen.getByTestId('input');

    await fireEvent.change(input, { target: { value: 'a! `' } });

    expect(input).toHaveValue('');
  });

  test('버튼 클릭시 액션', async () => {
    await render(<PointModalTestComp />);
    const input = await screen.getByTestId('input');
    const btn = await screen.findByTestId('10000');
    await fireEvent.click(btn);

    expect(input).toHaveValue('10,000');

    await fireEvent.change(input, { target: { value: '10000' } });
    await fireEvent.click(btn);

    expect(input).toHaveValue('20,000');
  });

  test('최댓값(10,000,000) 넘을 경우', async () => {
    await render(<PointModalTestComp />);
    const input = await screen.getByTestId('input');
    const btn = await screen.findByTestId('10000');

    await fireEvent.change(input, { target: { value: '99999999' } });
    expect(input).toHaveValue('10,000,000');

    await fireEvent.click(btn);
    expect(input).toHaveValue('10,000,000');
  });

  test('최솟값(10,000)보다 작을 경우', async () => {
    await render(<PointModalTestComp />);
    const input = await screen.getByTestId('input');

    await fireEvent.change(input, { target: { value: '1' } });
    const errorMessage = await screen.getByTestId('errorMessage');
    expect(errorMessage).toHaveTextContent(
      '1회 최소 충전가능한 포인트는 10,000 포인트입니다.',
    );
  });

  test('버튼 disabled 테스트', async () => {
    await render(<PointModalTestComp />);
    const input = await screen.getByTestId('input');
    const disabledBtn = await screen.getByTestId('disabled');

    const checkBox = await screen.getByTestId('checkbox');
    expect(disabledBtn).toBeDisabled();

    await fireEvent.change(input, { target: { value: '1000' } });
    expect(disabledBtn).toBeDisabled();

    await fireEvent.change(input, { target: { value: '10000' } });
    expect(disabledBtn).toBeDisabled();

    await fireEvent.click(checkBox);
    expect(disabledBtn).not.toBeDisabled();
  });
});
