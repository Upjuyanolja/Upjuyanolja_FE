import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '../matchMedia.mock';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';

describe('ImageUploadContainer', () => {
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
