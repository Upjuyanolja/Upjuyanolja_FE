import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ButtonContainer } from '@components/domain/init/ButtonContainer';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('ButtonContainer', () => {
  test('모든 필수 항목을 입력하면 다음 버튼이 활성화된다.', () => {
    const queryClient = new QueryClient();
    render(
      <BrowserRouter>
        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <ButtonContainer buttonStyle={'navigate'} isValid={true} />
          </QueryClientProvider>
        </RecoilRoot>
      </BrowserRouter>,
    );

    const nextButton = screen.getByTestId('accommodation-next-button');
    expect(nextButton).not.toHaveAttribute('disabled');
  });
});
