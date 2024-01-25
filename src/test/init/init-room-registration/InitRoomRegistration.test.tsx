import { MAX_PRICE, MIN_PRICE } from '@/constants/room/room-registration';
import { CapacityContainer } from '@components/room/capacity-container';
import { PriceContainer } from '@components/room/price-container';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

describe('InitRoomRegistration', () => {
  test(`객실 가격이 ${MIN_PRICE}보다 작으면 에러메세지를 띄워준다.`, () => {
    const TestComponent = () => {
      const [form] = Form.useForm();
      return (
        <BrowserRouter>
          <RecoilRoot>
            <Form form={form}>
              <PriceContainer header="객실 가격" form={form} />
            </Form>
          </RecoilRoot>
        </BrowserRouter>
      );
    };
    render(<TestComponent />);
    const testRoomPrice = screen.getByTestId('input-room-price');
    act(() => {
      userEvent.type(testRoomPrice, '9000');
    });
    const errorMessage = screen.getByTestId('error-input-price');
    expect(errorMessage).toBeInTheDocument();
  });

  test(`객실 가격이 ${MAX_PRICE}보다 크면 에러메세지를 띄워준다.`, () => {
    const TestComponent = () => {
      const [form] = Form.useForm();
      return (
        <BrowserRouter>
          <RecoilRoot>
            <Form form={form}>
              <PriceContainer header="객실 가격" form={form} />
            </Form>
          </RecoilRoot>
        </BrowserRouter>
      );
    };
    render(<TestComponent />);
    const testRoomPrice = screen.getByTestId('input-room-price');
    act(() => {
      userEvent.type(testRoomPrice, '2000000');
    });
    const errorMessage = screen.getByTestId('error-input-price');
    expect(errorMessage).toBeInTheDocument();
  });

  test('기준 인원이 최대 인원보다 크면 에러메세지를 띄워준다.', () => {
    const TestComponent = () => {
      const [form] = Form.useForm();
      return (
        <BrowserRouter>
          <RecoilRoot>
            <Form form={form}>
              <CapacityContainer header="인원" form={form} />
            </Form>
          </RecoilRoot>
        </BrowserRouter>
      );
    };
    render(<TestComponent />);
    const testDefaultCapacity = screen.getByTestId('default-capacity');
    const testMaxCapacity = screen.getByTestId('max-capacity');
    act(() => {
      userEvent.type(testDefaultCapacity, '5');
      userEvent.type(testMaxCapacity, '4');
    });
    const errorMessage = screen.getByTestId('error-input-capacity');
    expect(errorMessage).toBeInTheDocument();
  });
});
