import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { message } from 'antd';
import { IMAGE_MAX_CAPACITY } from '@/constants/init';
import { RecoilRoot } from 'recoil';

describe('ImageUploadContainer', () => {
  test(`업로드한 이미지의 용량이 ${IMAGE_MAX_CAPACITY}MB를 넘으면 toast를 띄운다.`, () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <ImageUploadContainer header="숙소 대표 이미지 설정" />
        </RecoilRoot>
      </BrowserRouter>,
    );

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

    expect(message.error).toHaveBeenCalled();
  });

  test('업로드한 파일의 형식이 .png, .jpeg, .jpg가 아니라면 toast를 띄운다', () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <ImageUploadContainer header="숙소 대표 이미지 설정" />
        </RecoilRoot>
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

    expect(message.error).toHaveBeenCalled();

    message.error = originalMessage;
  });
});
