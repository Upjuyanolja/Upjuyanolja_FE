import { DeleteOutlined } from '@ant-design/icons';
import { CustomButton } from '@components/init/init-info-confirmation/CustomButton';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '../../matchMedia.mock';

describe('InitInfoConfirmation', () => {
  test('객실 삭제 버튼을 누르면 삭제 모달이 띄워진다.', () => {
    jest.mock('antd', () => ({
      useDeleteConfirmModal: jest.fn(),
    }));

    const mockOpenDeleteConfirmModal = jest.fn();
    jest
      .requireMock('antd')
      .useDeleteConfirmModal.mockReturnValue(mockOpenDeleteConfirmModal);

    render(
      <BrowserRouter>
        <CustomButton
          text="삭제"
          icon={<DeleteOutlined />}
          onClick={mockOpenDeleteConfirmModal}
        />
      </BrowserRouter>,
    );

    const testDeleteButton = screen.getByTestId('delete-button');

    act(() => {
      userEvent.click(testDeleteButton);
    });
    expect(mockOpenDeleteConfirmModal).toHaveBeenCalled();
  });

  test('삭제 모달에서 삭제하기 버튼을 누르면 객실 삭제 함수가 실행된다.', () => {
    jest.mock('antd', () => ({
      useDeleteConfirmModal: jest.fn(),
    }));

    const mockOpenDeleteConfirmModal = jest.fn();
    jest
      .requireMock('antd')
      .useDeleteConfirmModal.mockReturnValue(mockOpenDeleteConfirmModal);

    const mockHandleOnOk = jest.fn();
    mockOpenDeleteConfirmModal.mockReturnValue({ onOk: mockHandleOnOk });

    const mockDeleteRoom = jest.fn();
    mockHandleOnOk.mockReturnValue(mockDeleteRoom);

    render(
      <BrowserRouter>
        <CustomButton
          text="삭제"
          icon={<DeleteOutlined />}
          onClick={mockOpenDeleteConfirmModal}
        />
      </BrowserRouter>,
    );

    const testDeleteButton = screen.getByTestId('delete-button');

    act(() => {
      userEvent.click(testDeleteButton);
    });

    expect(mockDeleteRoom).toHaveBeenCalled();
  });

  test('객실 수정 버튼을 누르면 객실 수정하기 페이지로 이동한다.', () => {
    const mockToRoomEditPage = jest.fn();

    render(
      <BrowserRouter>
        <CustomButton
          text="수정"
          icon={<DeleteOutlined />}
          onClick={mockToRoomEditPage}
        />
      </BrowserRouter>,
    );

    const testEditButton = screen.getByTestId('edit-button');
    act(() => {
      userEvent.click(testEditButton);
    });

    expect(window.location.pathname).toBe('/init/room-registration');
  });
});
