/* eslint-disable quotes */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Coupon } from '@pages/coupon';

jest.mock('antd/es/locale/ko_KR', () => ({
  locale: () => null,
}));

describe('쿠폰 데이터', () => {
  const queryClient = new QueryClient();
  /* 기본 동작 */
  test('쿠폰 페이지가 렌더링된다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Coupon />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    await waitFor(() => screen.findByTestId('coupon-header'));
  });
  test('쿠폰 아이템 체크박스가 작동한다', () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Coupon />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    const checkbox = container.querySelectorAll(
      "input[type='checkbox']",
    )[0] as HTMLInputElement;

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  /* 삭제  */
  test('아무것도 선택되지 않았을 때, 선택 삭제를 클릭하면 삭제할 쿠폰을 먼저 선택하세요 라는 메세지가 출력된다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Coupon />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    await waitFor(() => screen.findByTestId('table-container'), {
      timeout: 5000,
    });

    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(
      screen.getByText('삭제할 쿠폰을 먼저 선택하세요'),
    ).toBeInTheDocument();
  });

  test('수정 중 선택 삭제 버튼을 클릭하면 수정 중인 내용을 먼저 저장하세요 라는 메시지가 출력된다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Coupon />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => screen.findByTestId('table-container'), {
      timeout: 5000,
    });
    const dayLimitInput = screen.getAllByTestId(
      'day-limit-input',
    )[0] as HTMLInputElement;

    fireEvent.change(dayLimitInput, { target: { value: '10' } });

    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(
      screen.getByText('수정 중인 내용을 먼저 저장하세요'),
    ).toBeInTheDocument();
  });

  test('수량이 남아있는 쿠폰 삭제 시 수량이 남아있는 쿠폰이 있습니다 라는 메시지가 출력된다', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Coupon />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => screen.findByTestId('table-container'), {
      timeout: 5000,
    });

    const checkbox = container.querySelectorAll(
      "input[type='checkbox']",
    )[0] as HTMLInputElement;

    fireEvent.click(checkbox);

    const deleteButton = await screen.findByTestId('delete-button');
    fireEvent.click(deleteButton);

    await waitFor(
      () =>
        expect(
          screen.getByText('수량이 남아있는 쿠폰이 있습니다.'),
        ).toBeInTheDocument(),
      {
        timeout: 5000,
      },
    );
  });

  /* 수정 */
  test('쿠폰 아이템 일일 제한 수량 수정 후 저장버튼 활성화된다.', () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Coupon />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    const inputBox = container.querySelectorAll(
      "input[type='text']",
    )[0] as HTMLInputElement;

    const saveButton = screen.getByTestId('save-button');
    expect(saveButton).toBeDisabled();

    fireEvent.change(inputBox, { target: { value: '10' } });

    expect(saveButton).toBeEnabled();
  });
  test('쿠폰 아이템 일일 제한 수량에 문자 입력 시 block 된다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Coupon />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => screen.findByTestId('table-container'), {
      timeout: 5000,
    });
    const dayLimitInput = screen.getAllByTestId(
      'day-limit-input',
    )[0] as HTMLInputElement;

    fireEvent.change(dayLimitInput, { target: { value: '23aaaa' } });
    expect(dayLimitInput.value).toBe('23');
  });

  test('저장 버튼을 클릭하면 저장하시겠습니까? 라는 문구가 출력된다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Coupon />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => screen.findByTestId('table-container'), {
      timeout: 5000,
    });

    const dayLimitInput = screen.getAllByTestId(
      'day-limit-input',
    )[0] as HTMLInputElement;

    fireEvent.change(dayLimitInput, { target: { value: '10' } });

    const saveButton = screen.getByTestId('save-button');
    fireEvent.click(saveButton);

    await waitFor(
      () => expect(screen.getByText('저장하시겠습니까?')).toBeInTheDocument(),
      {
        timeout: 5000,
      },
    );
  });

  /* 추가 구매  */

  test('아무것도 선택되지 않았을 때, 추가 구매를 클릭하면 삭제할 쿠폰을 먼저 선택하세요 라는 메세지가 출력된다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Coupon />
        </BrowserRouter>
      </QueryClientProvider>,
    );
    await waitFor(() => screen.findByTestId('table-container'), {
      timeout: 5000,
    });

    const buyButton = screen.getByTestId('additional-buy-button');
    fireEvent.click(buyButton);

    expect(
      screen.getByText('구매할 쿠폰을 먼저 선택하세요'),
    ).toBeInTheDocument();
  });

  test('쿠폰 아이템 선택 후 추가 구매 버튼 클릭 시 추가 구매 모달이 출력된다', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Coupon />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => screen.findByTestId('table-container'), {
      timeout: 5000,
    });

    const checkbox = container.querySelectorAll(
      "input[type='checkbox']",
    )[0] as HTMLInputElement;

    fireEvent.click(checkbox);

    const buyButton = screen.getByTestId('additional-buy-button');
    fireEvent.click(buyButton);

    expect(screen.getByText('구매하기')).toBeInTheDocument();
  });
  test('수량 일괄 적용 클릭 시 수량 일괄 적용 input 값이 구매 쿠폰 input에 적용된다', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Coupon />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => screen.findByTestId('table-container'), {
      timeout: 5000,
    });

    const checkbox = container.querySelectorAll(
      "input[type='checkbox']",
    )[0] as HTMLInputElement;

    fireEvent.click(checkbox);

    const buyButton = screen.getByTestId('additional-buy-button');
    fireEvent.click(buyButton);

    const batchCheckbox = screen.getByTestId('batch-checkbox');
    fireEvent.click(batchCheckbox);

    const input = screen.getByTestId('batch-input');
    fireEvent.change(input, { target: { value: '10' } });

    const buyInput = screen.getAllByTestId('buy-input')[0] as HTMLInputElement;
    await waitFor(() => expect(buyInput.value).toBe('10'), {
      timeout: 5000,
    });
  });
  test('추가 구매 input에 문자 입력 시 block 된다', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Coupon />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => screen.findByTestId('table-container'), {
      timeout: 5000,
    });

    const checkbox = container.querySelectorAll(
      "input[type='checkbox']",
    )[0] as HTMLInputElement;

    fireEvent.click(checkbox);

    const buyButton = screen.getByTestId('additional-buy-button');
    fireEvent.click(buyButton);

    const input = screen.getAllByTestId('buy-input')[0] as HTMLInputElement;
    fireEvent.change(input, { target: { value: '10aaa' } });

    await waitFor(() => expect(input.value).toBe('10'), {
      timeout: 5000,
    });
  });
});
