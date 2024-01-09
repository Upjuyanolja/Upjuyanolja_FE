import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '../../matchMedia.mock';
import { AccommodationDesc } from '@components/init/init-accommodation-registration/AccommodationDesc';
import { AccommodationAddress } from '@components/init/init-accommodation-registration/AccommodationAddress';
import {
  ACCOMMODATION_DESC_MAX_LENGTH,
  ACCOMMODATION_DESC_MIN_LENGTH,
} from '@/constants/init/init-accommodation-registration';
import { Form } from 'antd';

jest.mock('react-daum-postcode', () => ({
  useDaumPostcodePopup: jest.fn(),
}));

describe('InitAccommodationRegistration', () => {
  test('주소 검색 버튼을 누르면 API 팝업이 열린다.', () => {
    const [form] = Form.useForm();
    const mockOpenAddressPopup = jest.fn();

    jest
      .requireMock('react-daum-postcode')
      .useDaumPostcodePopup.mockReturnValue(mockOpenAddressPopup);

    render(
      <BrowserRouter>
        <AccommodationAddress form={form} />
      </BrowserRouter>,
    );

    act(() => {
      fireEvent.click(screen.getByTestId('acccommodation-address-api-button'));
    });

    expect(mockOpenAddressPopup).toHaveBeenCalled();
  });

  test(`숙소소개에 ${ACCOMMODATION_DESC_MIN_LENGTH}글자 미만 입력했을 때 에러메세지를 띄운다.`, () => {
    render(
      <BrowserRouter>
        <AccommodationDesc />
      </BrowserRouter>,
    );
    const testAreaAccommodationDesc = screen.getByTestId(
      'textarea-accommodation-desc',
    );
    act(() => {
      userEvent.type(
        testAreaAccommodationDesc,
        'A'.repeat(ACCOMMODATION_DESC_MIN_LENGTH - 1),
      );
    });
    const errorMessage = screen.getByTestId(
      'error-textarea-accommodation-desc',
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test(`숙소소개에 ${ACCOMMODATION_DESC_MAX_LENGTH}자를 초과해 입력했을 때 input을 막는다.`, () => {
    render(
      <BrowserRouter>
        <AccommodationDesc />
      </BrowserRouter>,
    );
    const testAreaAccommodationDesc = screen.getByTestId(
      'textarea-accommodation-desc',
    );
    act(() => {
      userEvent.type(
        testAreaAccommodationDesc,
        'a'.repeat(ACCOMMODATION_DESC_MAX_LENGTH + 1),
      );
    });

    expect(testAreaAccommodationDesc).toHaveAttribute('disabled');
  });
});
