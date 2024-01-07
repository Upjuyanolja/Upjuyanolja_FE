import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '../matchMedia.mock';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { AccommodationName } from '@components/init-registration/AccommodationName';

describe('InitAccommodationRegistration', () => {
  test('숙소명을 2글자 미만 입력했을 때 에러메세지를 띄운다.', () => {
    render(
      <BrowserRouter>
        <AccommodationName />
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

  test('숙소명에 한글,영어,숫자,공백 외 다른 문자를 입력했다.', () => {
    render(
      <BrowserRouter>
        <AccommodationName />
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
        <AccommodationName />
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

  test('업로드한 이미지의 용량이 30MB를 넘으면 alert를 띄운다.', () => {
    render(
      <BrowserRouter>
        <ImageUploadContainer />
      </BrowserRouter>,
    );

    const originalAlert = window.alert;
    window.alert = jest.fn();

    const fileInput = screen.getByTestId('file-input');

    const largeFile = new File(['dummy content'], 'large-image.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(largeFile, 'size', {
      value: 31 * 1024 * 1024,
      writable: false,
    });

    act(() => {
      userEvent.upload(fileInput, largeFile);
    });

    expect(window.alert).toHaveBeenCalledWith(
      '업로드 가능한 최대 파일 크기는 30MB입니다. 파일 크기를 확인하신 후 다시 업로드해주세요.',
    );

    window.alert = originalAlert;
  });
});
