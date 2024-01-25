import { ROUTES } from '@/constants/routes';
import { DeleteOutlined } from '@ant-design/icons';
import { AccommodationInfo } from '@components/init/init-info-confirmation/AccommodationInfo';
import { CustomButton } from '@components/init/init-info-confirmation/CustomButton';
import { RoomInfo } from '@components/init/init-info-confirmation/RoomInfo';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

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

  test('객실 추가하기 버튼을 누르면 객실 추가하기 페이지로 이동한다.', () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <RoomInfo />
        </RecoilRoot>
      </BrowserRouter>,
    );

    const testEditButton = screen.getByTestId('add-room-button');
    act(() => {
      userEvent.click(testEditButton);
    });
    expect(window.location.pathname).toBe(ROUTES.INIT_ROOM_REGISTRATION);
  });

  test('숙소 수정하기 버튼을 누르면 숙소 수정 페이지로 이동한다.', () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <AccommodationInfo />
        </RecoilRoot>
      </BrowserRouter>,
    );

    const testEditButton = screen.getByTestId('edit-button');
    act(() => {
      userEvent.click(testEditButton);
    });

    expect(window.location.pathname).toBe(
      ROUTES.INIT_ACCOMMODATION_REGISTRATION,
    );
  });
});
