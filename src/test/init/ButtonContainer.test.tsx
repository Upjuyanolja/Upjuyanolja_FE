import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '../matchMedia.mock';
import { ButtonContainer } from '@components/init/ButtonContainer';

describe('ButtonContainer', () => {
  test('모든 필수 항목을 입력하면 다음 버튼이 활성화된다.', () => {
    render(
      <BrowserRouter>
        <ButtonContainer buttonStyle={'navigate'} isValid={true} />
      </BrowserRouter>,
    );

    const nextButton = screen.getByTestId('accommodation-next-button');
    expect(nextButton).not.toHaveAttribute('disabled');
  });
});
