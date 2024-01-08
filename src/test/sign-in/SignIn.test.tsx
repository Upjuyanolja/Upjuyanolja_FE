import { act, fireEvent, render, screen } from '@testing-library/react';
import { SignIn } from '.';
import React from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { HttpResponse, http } from 'msw';
import { server } from 'src/mocks/server';
import signInData from '../../assets/data/signInData.json';
import accomodationsData from '../../assets/data/accomodationsData.json';
// import '@testing-library/jest-dom/extend-expect';

const mockedUsedNavigate = jest.fn();
const mockedNavigate = useNavigate as jest.Mock;
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('입력창 테스트', () => {
  test('이메일 입력창 focus 해제', async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );
    await act(async () => {
      const emailInput = await screen.getByTestId('emailInput');
      const passWordInput = await screen.getByTestId('pwInput');

      fireEvent.click(emailInput);
      fireEvent.click(passWordInput);

      expect(document.activeElement).not.toBe(emailInput);
      setTimeout(() => {
        const errorMessage = screen.getByText(/이메일을 입력하세요/i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
    });
  });

  test('이메일 입력창 유효성 검사 탈락', async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );
    await act(async () => {
      const emailInput = await screen.getByTestId('emailInput');
      fireEvent.change(emailInput, { target: { value: '아이브가을' } });
      expect((emailInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('emailInput')).toHaveValue('아이브가을');
      setTimeout(() => {
        const errorMessage =
          screen.getByText(/유효한 이메일 주소를 입력하세요/i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
    });
  });

  test('비밀번호 입력창 focus 해제', async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );
    await act(async () => {
      const emailInput = await screen.getByTestId('emailInput');
      const passWordInput = await screen.getByTestId('pwInput');

      fireEvent.click(passWordInput);
      fireEvent.click(emailInput);

      expect(document.activeElement).not.toBe(emailInput);
      setTimeout(() => {
        const errorMessage = screen.getByText(/비밀번호를 입력하세요/i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
    });
  });

  test('비밀번호 입력 창 내 비밀번호 보이는 아이콘 클릭', async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );
    await act(async () => {
      const passWordInput = await screen.getByTestId('pwInput');
      const invisible = await screen.getByTestId('invisible');
      fireEvent.change(passWordInput, { target: { value: '아이브가을' } });
      expect((passWordInput as HTMLInputElement).type).toBe('password');
      fireEvent.click(invisible);
      setTimeout(async () => {
        const visible = await screen.getByTestId('visible');
        expect(visible).toBeInTheDocument;
        expect(screen.getByTestId('pwInput')).toHaveValue('아이브가을');
        expect((passWordInput as HTMLInputElement).type).toBe('text');
      }, 3000);
    });
  });
});

describe('로그인 테스트', () => {
  test('로그인 버튼을 누른다(400에러)', async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );
    await act(async () => {
      const emailInput = await screen.findByTestId('emailInput');
      const passWordInput = await screen.findByTestId('pwInput');
      fireEvent.change(emailInput, { target: { value: 'ivegaeul' } });
      fireEvent.change(passWordInput, { target: { value: 'ivegaeul' } });
      setTimeout(() => {
        const errorMessage =
          screen.getByText(/유효한 이메일 주소를 입력하세요/i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
      const signInBtn = await screen.findByTestId('signInBtn');
      setTimeout(() => {
        fireEvent.click(signInBtn);
        server.use(
          http.post('/api/auth/owner/signin', () => {
            return HttpResponse.json(signInData, { status: 400 });
          }),
        );
      }, 3000);
      setTimeout(async () => {
        const toast = await screen.findByTestId('toast');
        expect(toast).toBeInTheDocument();
      }, 5000);
    });
  });

  test('로그인 버튼을 누른다(로그인한 사장님이 보유하고 있는 숙소가 이미 있을 경우)', async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );

    await act(async () => {
      const emailInput = await screen.findByTestId('emailInput');
      const passWordInput = await screen.findByTestId('pwInput');
      fireEvent.change(emailInput, { target: { value: 'ivegaeul@naver.com' } });
      fireEvent.change(passWordInput, { target: { value: 'ivegaeul1' } });
      const signInBtn = await screen.findByTestId('signInBtn');
      setTimeout(() => {
        fireEvent.click(signInBtn);
        server.use(
          http.post('/api/auth/owner/signin', () => {
            return HttpResponse.json(signInData, { status: 200 });
          }),
        );
        server.use(
          http.get('/api/auth/owner/signin', () => {
            return HttpResponse.json(accomodationsData, { status: 200 });
          }),
        );
      }, 3000);
      setTimeout(() => {
        expect(window.location.pathname).toBe('/');
      }, 5000);
    });
  });

  test('로그인 버튼을 누른다(로그인한 사장님이 보유하고 있는 숙소가 하나도 없을 경우)', async () => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>,
    );

    await act(async () => {
      const emailInput = await screen.findByTestId('emailInput');
      const passWordInput = await screen.findByTestId('pwInput');
      fireEvent.change(emailInput, { target: { value: 'ivegaeul@naver.com' } });
      fireEvent.change(passWordInput, { target: { value: 'ivegaeul1' } });
      const signInBtn = await screen.findByTestId('signInBtn');
      setTimeout(() => {
        fireEvent.click(signInBtn);
        server.use(
          http.post('/api/auth/owner/signin', () => {
            return HttpResponse.json(signInData, { status: 200 });
          }),
        );
        server.use(
          http.get('/api/auth/owner/signin', () => {
            return HttpResponse.json(accomodationsData, { status: 400 });
          }),
        );
      }, 3000);
      setTimeout(() => {
        expect(window.location.pathname).toBe('/init');
      }, 5000);
    });
  });
});

test('로그인 후 로그인, 회원 가입, 사용자 이용 동의, 회원 가입 완료 페이지 접근 불가', async () => {
  render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>,
  );

  await act(async () => {
    const emailInput = await screen.findByTestId('emailInput');
    const passWordInput = await screen.findByTestId('pwInput');
    fireEvent.change(emailInput, { target: { value: 'ivegaeul@naver.com' } });
    fireEvent.change(passWordInput, { target: { value: 'ivegaeul1' } });
    const signInBtn = await screen.findByTestId('signInBtn');
    setTimeout(() => {
      fireEvent.click(signInBtn);
      server.use(
        http.post('/api/auth/owner/signin', () => {
          return HttpResponse.json(signInData, { status: 200 });
        }),
      );
    }, 3000);
    setTimeout(() => {
      mockedNavigate.mock.calls[0][0]('/signin');
      expect(window.location.pathname).toBe('/');
    }, 5000);
    setTimeout(() => {
      mockedNavigate.mock.calls[0][0]('/signup');
      expect(window.location.pathname).toBe('/');
    }, 5000);
    setTimeout(() => {
      mockedNavigate.mock.calls[0][0]('/signin/agreement');
      expect(window.location.pathname).toBe('/');
    }, 5000);
    setTimeout(() => {
      mockedNavigate.mock.calls[0][0]('/signup/success');
      expect(window.location.pathname).toBe('/');
    }, 5000);
  });
});

test('회원 가입 버튼을 누른다', async () => {
  render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>,
  );
  await act(async () => {
    const signUpBtn = await screen.findByTestId('signUpBtn');
    expect(signUpBtn.textContent).toBe('회원가입');
    fireEvent.click(signUpBtn);

    setTimeout(() => {
      expect(window.location.pathname).toBe('/signin/agreement');
    }, 5000);
  });
});
