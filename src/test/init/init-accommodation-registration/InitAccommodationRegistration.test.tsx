import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { AccommodationDesc } from '@components/domain/init/init-accommodation-registration/AccommodationDesc';
import { AccommodationAddress } from '@components/domain/init/init-accommodation-registration/AccommodationAddress';
import { ACCOMMODATION_DESC_MIN_LENGTH } from '@/constants/init/init-accommodation-registration';
import { Form } from 'antd';
import { RecoilRoot } from 'recoil';

jest.mock('react-daum-postcode', () => ({
  useDaumPostcodePopup: jest.fn(),
}));

describe('InitAccommodationRegistration', () => {
  test('주소 검색 버튼을 누르면 API 팝업이 열린다.', () => {
    const mockOpenAddressPopup = jest.fn();

    jest
      .requireMock('react-daum-postcode')
      .useDaumPostcodePopup.mockReturnValue(mockOpenAddressPopup);

    const TestComponent = () => {
      const [form] = Form.useForm();

      return (
        <BrowserRouter>
          <RecoilRoot>
            <Form form={form}>
              <AccommodationAddress form={form} />
            </Form>
          </RecoilRoot>
        </BrowserRouter>
      );
    };

    render(<TestComponent />);

    act(() => {
      userEvent.click(screen.getByTestId('acccommodation-address-api-button'));
    });

    expect(mockOpenAddressPopup).toHaveBeenCalled();
  });

  test(`숙소 소개에 ${ACCOMMODATION_DESC_MIN_LENGTH}글자 미만 입력했을 때 에러메세지를 띄운다.`, () => {
    const TestComponent = () => {
      const [form] = Form.useForm();

      return (
        <BrowserRouter>
          <Form form={form}>
            <AccommodationDesc form={form} />
          </Form>
        </BrowserRouter>
      );
    };

    render(<TestComponent />);
    const testAreaAccommodationDesc = screen.getByTestId(
      'textarea-accommodation-desc',
    );

    act(() => {
      userEvent.type(
        testAreaAccommodationDesc,
        'A'.repeat(ACCOMMODATION_DESC_MIN_LENGTH - 1),
      );
    });

    setTimeout(() => {
      const errorMessage = screen.getByText(
        `숙소 소개는 최소 ${ACCOMMODATION_DESC_MIN_LENGTH}자 이상 작성해 주세요.`,
      );
      expect(errorMessage).toBeInTheDocument();
    }, 1000);
  });
});
