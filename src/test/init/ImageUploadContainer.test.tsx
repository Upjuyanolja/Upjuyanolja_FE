import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '../matchMedia.mock';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { message } from 'antd';
import { IMAGE_MAX_CAPACITY } from '@/constants/init';

describe('ImageUploadContainer', () => {
  test(`업로드한 이미지의 용량이 ${IMAGE_MAX_CAPACITY}MB를 넘으면 toast를 띄운다.`, () => {
    render(
      <BrowserRouter>
        <ImageUploadContainer header="숙소 대표 이미지 설정" />
      </BrowserRouter>,
    );

    const originalMessage = message.error;
    message.error = jest.fn();

    const fileInput = screen.getByTestId('file-input');

    const largeFile = new File(['dummy content'], 'large-image.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(largeFile, 'size', {
      value: (IMAGE_MAX_CAPACITY + 1) * 1024 * 1024,
      writable: false,
    });

    act(() => {
      userEvent.upload(fileInput, largeFile);
    });

    expect(message.error).toHaveBeenCalledWith({
      content: `최대 ${IMAGE_MAX_CAPACITY}MB 파일 크기로 업로드 가능합니다.`,
    });

    message.error = originalMessage;
  });

  test('업로드한 파일의 형식이 .png, .jpeg, .jpg가 아니라면 toast를 띄운다', () => {
    render(
      <BrowserRouter>
        <ImageUploadContainer header="숙소 대표 이미지 설정" />
      </BrowserRouter>,
    );

    const originalMessage = message.error;
    message.error = jest.fn();

    const fileInput = screen.getByTestId('file-input');

    const largeFile = new File(['dummy content'], 'large-image.tif', {
      type: 'image/tif',
    });

    act(() => {
      userEvent.upload(fileInput, largeFile);
    });

    expect(message.error).toHaveBeenCalledWith({
      content: '.png, .jpeg, .jpg 파일만 등록 가능합니다.',
    });

    message.error = originalMessage;
  });
});
