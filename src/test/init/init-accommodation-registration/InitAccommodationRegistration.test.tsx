import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '../matchMedia.mock';
import { AccommodationDesc } from '@components/init/init-accommodation-registration/AccommodationDesc';
import { AccommodationAddress } from '@components/init/init-accommodation-registration/AccommodationAddress';
import axios from 'axios';

describe('InitAccommodationRegistration', () => {
  test('주소 검색 버튼을 누르면 주소 api를 호출하고, 데이터를 state로 설정해 출력한다.', () => {
    render(
      <BrowserRouter>
        <AccommodationAddress />
      </BrowserRouter>,
    );
    const accommodationAddressAPIButton = screen.getByTestId(
      'acccommodation-address-api-button',
    );

    const responseData = { post: '12345', address: '경기도 구리시' };
    const axiosMock = jest.spyOn(axios, 'get');
    axiosMock.mockResolvedValue({ data: responseData });

    act(() => {
      userEvent.click(accommodationAddressAPIButton);
    });

    expect(screen.getByTestId('accommodation-post')).toHaveValue(
      responseData.post,
    );
    expect(screen.getByTestId('accommodation-address')).toHaveValue(
      responseData.address,
    );
  });
});

test('숙소소개에 10글자 미만 입력했을 때 에러메세지를 띄운다.', () => {
  render(
    <BrowserRouter>
      <AccommodationDesc />
    </BrowserRouter>,
  );
  const testAreaAccommodationDesc = screen.getByTestId(
    'textarea-accommodation-desc',
  );
  act(() => {
    userEvent.type(testAreaAccommodationDesc, '안녕');
  });
  const errorMessage = screen.getByTestId('error-textarea-accommodation-desc');
  expect(errorMessage).toBeInTheDocument();
});

test('숙소소개에 500자를 초과해 입력했을 때 input을 막는다.', () => {
  render(
    <BrowserRouter>
      <AccommodationDesc />
    </BrowserRouter>,
  );
  const testAreaAccommodationDesc = screen.getByTestId(
    'textarea-accommodation-desc',
  );
  act(() => {
    userEvent.type(testAreaAccommodationDesc, 'a'.repeat(501));
  });

  expect(testAreaAccommodationDesc).toHaveAttribute('disabled');
});