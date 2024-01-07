import { InitAccommodationRegistration } from '@pages/init-accommodation-registration';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '../matchMedia.mock';

jest.mock('@ant-design/plots', () => ({
  Column: () => null,
  ColumnConfig: () => null,
}));

describe('InitAccommodationRegistration', () => {
  test('숙소명을 2글자 미만 입력했을 때 에러메세지를 띄운다.', () => {
    render(
      <BrowserRouter>
        <InitAccommodationRegistration />
      </BrowserRouter>,
    );
    const inputAccommodationName = screen.getByTestId(
      'input-accommodation-name',
    );
    act(() => {
      userEvent.type(inputAccommodationName, '안');
    });
    const errorMessage = screen.getByTestId('error-input-accommodation-name');
    expect(errorMessage).toBeInTheDocument();
  });

  test('숙소명에 한글,영어,숫자,공백 외 다른 문자를 입력했다', () => {
    render(
      <BrowserRouter>
        <InitAccommodationRegistration />
      </BrowserRouter>,
    );
    const inputAccommodationName = screen.getByTestId(
      'input-accommodation-name',
    );
    act(() => {
      userEvent.type(inputAccommodationName, '!!');
    });
    const errorMessage = screen.getByTestId('error-input-accommodation-name');
    expect(errorMessage).toBeInTheDocument();
  });

  test('숙소명을 30자를 초과해 입력했을 때 input을 막는다.', () => {
    render(
      <BrowserRouter>
        <InitAccommodationRegistration />
      </BrowserRouter>,
    );
    const inputAccommodationName = screen.getByTestId(
      'input-accommodation-name',
    );
    act(() => {
      userEvent.type(inputAccommodationName, 'a'.repeat(31));
    });

    expect(inputAccommodationName).toHaveAttribute('disabled');
  });
});
