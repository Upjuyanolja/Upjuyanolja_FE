import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { NameContainer } from '@components/init/NameContainer';
import { ACCOMMODATION_NAME_MIN_LENGTH } from '@/constants/init/init-accommodation-registration';
import { Form } from 'antd';
import { RecoilRoot } from 'recoil';

describe('NameContainer', () => {
  test(`숙소명을 ${ACCOMMODATION_NAME_MIN_LENGTH}글자 미만 입력했을 때 에러메세지를 띄운다.`, () => {
    const TestComponent = () => {
      const [form] = Form.useForm();
      return (
        <BrowserRouter>
          <RecoilRoot>
            <Form form={form}>
              <NameContainer
                header="숙소명"
                placeholder="숙소명을 입력해 주세요."
                form={form}
              />
            </Form>
          </RecoilRoot>
        </BrowserRouter>
      );
    };

    render(<TestComponent />);

    const inputAccommodationName = screen.getByTestId('input-name');
    act(() => {
      userEvent.type(
        inputAccommodationName,
        'A'.repeat(ACCOMMODATION_NAME_MIN_LENGTH - 1),
      );
    });

    setTimeout(() => {
      const errorMessage = screen.getByText(
        `숙소명은 최소 ${ACCOMMODATION_NAME_MIN_LENGTH}자 이상 작성해 주세요.`,
      );
      expect(errorMessage).toBeInTheDocument();
    }, 1000);
  });
});
