import { act, fireEvent, render, screen } from '@testing-library/react';
import { SignUp } from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import failRequestPostData1 from '../../assets/data/failRequestPostData1.json';
import failRequestPostData2 from '../../assets/data/failRequestPostData2.json';
import failRequestGetData1 from '../../assets/data/failRequestGetData1.json';
import failRequestGetData2 from '../../assets/data/failRequestGetData2.json';
import verifyAuthenticationData from '../../assets/data/verifyAuthenticationData.json';
import signUpData from '../../assets/data/signUpData.json';
import { HttpResponse, http } from 'msw';
import { server } from 'src/mocks/server';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe('입력창 테스트', () => {
  let queryClient: QueryClient;
  beforeEach(() => {
    // Initialize a new QueryClient for each test
    queryClient = new QueryClient();
  });
  test('이메일 유효성 검사를 통과하지 못한 상태로 인증 요청 버튼을 누른다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const emailInput = await screen.getByTestId('emailInput');
      fireEvent.change(emailInput, { target: { value: '아이브가을' } });
      expect((emailInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('emailInput')).toHaveValue('아이브가을');
      const requestBtn = await screen.getByTestId('requestBtn');
      setTimeout(() => {
        fireEvent.click(requestBtn);

        const errorMessage =
          screen.getByText(/이메일 형식이 올바르지 않습니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
    });
  });
  test('입력한 이메일이 가상의 입점 DB에 존재하지 않는 이메일인 경우 인증 요청 버튼을 누른다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const emailInput = await screen.getByTestId('emailInput');
      fireEvent.change(emailInput, { target: { value: 'ivegaeul@naver.com' } });
      expect((emailInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('emailInput')).toHaveValue(
        'ivegaeul@naver.com',
      );
      const requestBtn = await screen.getByTestId('requestBtn');
      setTimeout(() => {
        fireEvent.click(requestBtn);
        server.use(
          http.post('/api/auth/owners/request-email', () => {
            return HttpResponse.json(failRequestPostData1, { status: 400 });
          }),
        );
        const errorMessage =
          screen.getByText(/입점 권한이 없는 이메일입니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
    });
  });
  test('입력한 이메일이 이미 빨리잡자! 쿠폰센터(백오피스)에 가입된 이메일인 경우 인증 요청 버튼을 누른다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const emailInput = await screen.getByTestId('emailInput');
      fireEvent.change(emailInput, { target: { value: 'ivegaeul@naver.com' } });
      expect((emailInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('emailInput')).toHaveValue(
        'ivegaeul@naver.com',
      );
      const requestBtn = await screen.getByTestId('requestBtn');
      setTimeout(() => {
        fireEvent.click(requestBtn);
        server.use(
          http.post('/api/auth/owners/request-email', () => {
            return HttpResponse.json(failRequestPostData2, { status: 400 });
          }),
        );
        const errorMessage = screen.getByText(/이미 가입된 이메일입니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
    });
  });
  test('입력한 이메일이 가상의 입점 DB에 존재하며, 업주야놀자(백오피스)에 해당 이메일로 회원가입한 회원이 없을 경우 인증 요청 버튼을 누른다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const emailInput = await screen.getByTestId('emailInput');
      fireEvent.change(emailInput, { target: { value: 'ivegaeul@naver.com' } });
      expect((emailInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('emailInput')).toHaveValue(
        'ivegaeul@naver.com',
      );
      const requestBtn = await screen.getByTestId('requestBtn');
      setTimeout(() => {
        fireEvent.click(requestBtn);
        server.use(
          http.post('/api/auth/owners/request-email', () => {
            return HttpResponse.json(verifyAuthenticationData, { status: 200 });
          }),
        );
        const errorMessage = screen.getByText(/사용 가능한 이메일입니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
    });
  });
  test('입력한 인증 번호가 올바르지 않은 경우 인증 요청 버튼을 누른다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const emailInput = await screen.getByTestId('emailInput');
      fireEvent.change(emailInput, { target: { value: 'ivegaeul@naver.com' } });
      expect((emailInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('emailInput')).toHaveValue(
        'ivegaeul@naver.com',
      );
      const requestBtn = await screen.getByTestId('requestBtn');
      setTimeout(() => {
        fireEvent.click(requestBtn);
        server.use(
          http.post('/api/auth/owners/request-email', () => {
            return HttpResponse.json(verifyAuthenticationData, { status: 200 });
          }),
        );
        const errorMessage = screen.getByText(/사용 가능한 이메일입니다./i);
        expect(errorMessage).toBeInTheDocument();
        expect(emailInput).toHaveAttribute('readOnly');
        expect(requestBtn).toBeDisabled();
      }, 3000);

      const verificationInput = await screen.getByTestId('verificationInput');
      fireEvent.change(verificationInput, { target: { value: '020924' } });
      expect((verificationInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('verificationInput')).toHaveValue('020924');
      const confirmBtn = await screen.getByTestId('confirmBtn');
      setTimeout(() => {
        fireEvent.click(confirmBtn);
        server.use(
          http.get(
            `/api/auth/owners/verify/email=${emailInput}&verificationCode=${verificationInput}`,
            () => {
              return HttpResponse.json(failRequestGetData1, { status: 400 });
            },
          ),
        );
        const errorMessage = screen.getByText(/인증번호가 일치하지 않습니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
    });
  });
  test('입력한 인증 번호가 올바르지 않은 경우 인증 요청 버튼을 누른다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const emailInput = await screen.getByTestId('emailInput');
      fireEvent.change(emailInput, { target: { value: 'ivegaeul@naver.com' } });
      expect((emailInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('emailInput')).toHaveValue(
        'ivegaeul@naver.com',
      );
      const requestBtn = await screen.getByTestId('requestBtn');
      setTimeout(() => {
        fireEvent.click(requestBtn);
        server.use(
          http.post('/api/auth/owners/request-email', () => {
            return HttpResponse.json(verifyAuthenticationData, { status: 200 });
          }),
        );
        const errorMessage = screen.getByText(/사용 가능한 이메일입니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
      setTimeout(() => {
        expect(emailInput).toHaveAttribute('readOnly');
        expect(requestBtn).toBeDisabled();
      }, 3000);
      const verificationInput = await screen.getByTestId('verificationInput');
      fireEvent.change(verificationInput, { target: { value: '020924' } });
      expect((verificationInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('verificationInput')).toHaveValue('020924');
      const confirmBtn = await screen.getByTestId('confirmBtn');
      setTimeout(() => {
        fireEvent.click(confirmBtn);
        server.use(
          http.get(
            `/api/auth/owners/verify?email=${emailInput}&verificationCode=${verificationInput}`,
            () => {
              return HttpResponse.json(failRequestGetData2, { status: 400 });
            },
          ),
        );
        const errorMessage = screen.getByText(/인증번호가 일치하지 않습니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
    });
  });
  test('입력한 인증 번호가 올바른 경우 인증 요청 버튼을 누른다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const emailInput = await screen.getByTestId('emailInput');
      fireEvent.change(emailInput, { target: { value: 'ivegaeul@naver.com' } });
      expect((emailInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('emailInput')).toHaveValue(
        'ivegaeul@naver.com',
      );
      const requestBtn = await screen.getByTestId('requestBtn');
      setTimeout(() => {
        fireEvent.click(requestBtn);
        server.use(
          http.post('/api/auth/owners/request-email', () => {
            return HttpResponse.json(verifyAuthenticationData, { status: 200 });
          }),
        );
        const errorMessage = screen.getByText(/사용 가능한 이메일입니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
      setTimeout(() => {
        expect(emailInput).toHaveAttribute('readOnly');
        expect(requestBtn).toBeDisabled();
      }, 3000);
      const verificationInput = await screen.getByTestId('verificationInput');
      fireEvent.change(verificationInput, { target: { value: '020924' } });
      expect((verificationInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('verificationInput')).toHaveValue('020924');
      const confirmBtn = await screen.getByTestId('confirmBtn');
      setTimeout(() => {
        fireEvent.click(confirmBtn);
        server.use(
          http.get(
            `/api/auth/owners/verify/email=${emailInput}&verificationCode=${verificationInput}`,
            () => {
              return HttpResponse.json(verifyAuthenticationData, {
                status: 200,
              });
            },
          ),
        );
        const errorMessage = screen.getByText(/인증이 완료되었습니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
      setTimeout(() => {
        expect(verificationInput).toHaveAttribute('readOnly');
        expect(confirmBtn).toBeDisabled();
      }, 3000);
    });
  });
  test('비밀 번호 창 유효성 검사를 통과하지 못한다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const pwInput = await screen.findByTestId('pwInput');
      const placeholderValue = pwInput.getAttribute('placeholder');
      expect(placeholderValue).toBe('비밀번호 입력');
      fireEvent.change(pwInput, { target: { value: 'ivegaeul' } });
      expect((pwInput as HTMLInputElement).type).toBe('password');
      expect(screen.getByTestId('pwInput')).toHaveValue('ivegaeul');
      setTimeout(() => {
        const errorMessage = screen.getByText(
          /영문(대,소문자), 숫자 포함 8~20자로 입력해 주세요./i,
        );
        expect(errorMessage).toBeInTheDocument();
      }, 2000);
    });
  });
  test('비밀 번호 유효성 검사를 통과한다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const pwInput = await screen.findByTestId('pwInput');
      const placeholderValue = pwInput.getAttribute('placeholder');
      expect(placeholderValue).toBe('비밀번호 입력');
      fireEvent.change(pwInput, { target: { value: 'ivegaeul1' } });
      expect((pwInput as HTMLInputElement).type).toBe('password');
      expect(screen.getByTestId('pwInput')).toHaveValue('ivegaeul1');
      setTimeout(() => {
        const errorMessage = screen.getByText(
          /8~20자 영문(대,소문자)\/숫자 조합/i,
        );
        expect(errorMessage).toBeInTheDocument();
      }, 2000);
    });
  });
  test('비밀 번호 확인 유효성 검사를 통과하지 못한다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const pwInput = await screen.findByTestId('pwInput');
      const placeholderValue = pwInput.getAttribute('placeholder');
      expect(placeholderValue).toBe('비밀번호 입력');
      fireEvent.change(pwInput, { target: { value: 'ivegaeul1' } });
      expect((pwInput as HTMLInputElement).type).toBe('password');
      expect(screen.getByTestId('pwInput')).toHaveValue('ivegaeul1');
      setTimeout(() => {
        const errorMessage = screen.getByText(
          /8~20자 영문(대,소문자)\/숫자 조합/i,
        );
        expect(errorMessage).toBeInTheDocument();
      }, 2000);
      const checkPwInput = await screen.findByTestId('checkPwInput');
      const placeholderValue2 = checkPwInput.getAttribute('placeholder');
      expect(placeholderValue2).toBe('비밀번호 재입력');
      fireEvent.change(checkPwInput, { target: { value: 'ivegaeul' } });
      expect((checkPwInput as HTMLInputElement).type).toBe('password');
      expect(screen.getByTestId('checkPwInput')).toHaveValue('ivegaeul');
      setTimeout(() => {
        const errorMessage = screen.getByText(/비밀번호가 일치하지 않습니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 2000);
    });
  });
  test('비밀 번호 확인 유효성 검사를 통과한다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const pwInput = await screen.findByTestId('pwInput');
      const placeholderValue = pwInput.getAttribute('placeholder');
      expect(placeholderValue).toBe('비밀번호 입력');
      fireEvent.change(pwInput, { target: { value: 'ivegaeul1' } });
      expect((pwInput as HTMLInputElement).type).toBe('password');
      expect(screen.getByTestId('pwInput')).toHaveValue('ivegaeul1');
      setTimeout(() => {
        const errorMessage = screen.getByText(
          /8~20자 영문(대,소문자)\/숫자 조합/i,
        );
        expect(errorMessage).toBeInTheDocument();
      }, 2000);
      const checkPwInput = await screen.findByTestId('checkPwInput');
      const placeholderValue2 = checkPwInput.getAttribute('placeholder');
      expect(placeholderValue2).toBe('비밀번호 재입력');
      fireEvent.change(checkPwInput, { target: { value: 'ivegaeul1' } });
      expect((checkPwInput as HTMLInputElement).type).toBe('password');
      expect(screen.getByTestId('checkPwInput')).toHaveValue('ivegaeul1');
      setTimeout(() => {
        const errorMessage = screen.getByText(/비밀번호가 일치합니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 2000);
    });
  });
  test('비밀번호 입력 창 내 비밀번호 보이는 아이콘 클릭', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const passWordInput = await screen.getByTestId('pwInput');
      const pwVisible = await screen.getByTestId('pwInvisible');
      fireEvent.change(passWordInput, { target: { value: '아이브가을' } });
      expect((passWordInput as HTMLInputElement).type).toBe('password');
      fireEvent.click(pwVisible);
      setTimeout(async () => {
        const pwInvisible = await screen.getByTestId('pwVisible');
        expect(pwInvisible).toBeInTheDocument;
        expect(screen.getByTestId('pwInput')).toHaveValue('아이브가을');
        expect((passWordInput as HTMLInputElement).type).toBe('text');
      }, 3000);
    });
  });
  test('비밀번호 확인 창 내 비밀번호 보이는 아이콘 클릭', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const passWordInput = await screen.getByTestId('checkPwInput');
      const pwVisible = await screen.getByTestId('checkPwInvisible');
      fireEvent.change(passWordInput, { target: { value: '아이브가을' } });
      expect((passWordInput as HTMLInputElement).type).toBe('password');
      fireEvent.click(pwVisible);
      setTimeout(async () => {
        const pwInvisible = await screen.getByTestId('checkPwVisible');
        expect(pwInvisible).toBeInTheDocument;
        expect(screen.getByTestId('checkPwInput')).toHaveValue('아이브가을');
        expect((passWordInput as HTMLInputElement).type).toBe('text');
      }, 3000);
    });
  });
  test('이메일, 비밀 번호, 비밀 번호 확인 유효성 검사를 통과한다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const emailInput = await screen.getByTestId('emailInput');
      fireEvent.change(emailInput, { target: { value: 'ivegaeul@naver.com' } });
      expect((emailInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('emailInput')).toHaveValue(
        'ivegaeul@naver.com',
      );
      const requestBtn = await screen.getByTestId('requestBtn');
      setTimeout(() => {
        fireEvent.click(requestBtn);
        server.use(
          http.post('/api/auth/owners/request-email', () => {
            return HttpResponse.json(verifyAuthenticationData, { status: 200 });
          }),
        );
        const errorMessage = screen.getByText(/사용 가능한 이메일입니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
      setTimeout(() => {
        expect(emailInput).toHaveAttribute('readOnly');
        expect(requestBtn).toBeDisabled();
      }, 3000);
      const verificationInput = await screen.getByTestId('verificationInput');
      fireEvent.change(verificationInput, { target: { value: '020924' } });
      expect((verificationInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('verificationInput')).toHaveValue('020924');
      const confirmBtn = await screen.getByTestId('confirmBtn');
      setTimeout(() => {
        fireEvent.click(confirmBtn);
        server.use(
          http.get(
            `/api/auth/owners/verify/email=${emailInput}&verificationCode=${verificationInput}`,
            () => {
              return HttpResponse.json(verifyAuthenticationData, {
                status: 200,
              });
            },
          ),
        );
        const errorMessage = screen.getByText(/인증이 완료되었습니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
      setTimeout(() => {
        expect(verificationInput).toHaveAttribute('readOnly');
        expect(confirmBtn).toBeDisabled();
      }, 3000);
      const pwInput = await screen.findByTestId('pwInput');
      const placeholderValue = pwInput.getAttribute('placeholder');
      expect(placeholderValue).toBe('비밀번호 입력');
      fireEvent.change(pwInput, { target: { value: 'ivegaeul1' } });
      expect((pwInput as HTMLInputElement).type).toBe('password');
      expect(screen.getByTestId('pwInput')).toHaveValue('ivegaeul1');
      setTimeout(() => {
        const errorMessage = screen.getByText(
          /8~20자 영문(대,소문자)\/숫자 조합/i,
        );
        expect(errorMessage).toBeInTheDocument();
      }, 2000);
      const checkPwInput = await screen.findByTestId('checkPwInput');
      const placeholderValue2 = checkPwInput.getAttribute('placeholder');
      expect(placeholderValue2).toBe('비밀번호 재입력');
      fireEvent.change(checkPwInput, { target: { value: 'ivegaeul1' } });
      expect((checkPwInput as HTMLInputElement).type).toBe('password');
      expect(screen.getByTestId('checkPwInput')).toHaveValue('ivegaeul1');
      setTimeout(() => {
        const errorMessage = screen.getByText(/비밀번호가 일치합니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 2000);
      const successBtn = await screen.getByTestId('successBtn');
      expect(successBtn).toBeInTheDocument();
    });
  });
  test('회원 가입 완료 버튼을 클릭한다(활성화 시)', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const emailInput = await screen.getByTestId('emailInput');
      fireEvent.change(emailInput, { target: { value: 'ivegaeul@naver.com' } });
      expect((emailInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('emailInput')).toHaveValue(
        'ivegaeul@naver.com',
      );
      const requestBtn = await screen.getByTestId('requestBtn');
      setTimeout(() => {
        fireEvent.click(requestBtn);
        server.use(
          http.post('/api/auth/owners/request-email', () => {
            return HttpResponse.json(verifyAuthenticationData, { status: 200 });
          }),
        );
        const errorMessage = screen.getByText(/사용 가능한 이메일입니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
      setTimeout(() => {
        expect(emailInput).toHaveAttribute('readOnly');
        expect(requestBtn).toBeDisabled();
      }, 3000);
      const verificationInput = await screen.getByTestId('verificationInput');
      fireEvent.change(verificationInput, { target: { value: '020924' } });
      expect((verificationInput as HTMLInputElement).type).toBe('text');
      expect(screen.getByTestId('verificationInput')).toHaveValue('020924');
      const confirmBtn = await screen.getByTestId('confirmBtn');
      setTimeout(() => {
        fireEvent.click(confirmBtn);
        server.use(
          http.get(
            `/api/auth/owners/verify/email=${emailInput}&verificationCode=${verificationInput}`,
            () => {
              return HttpResponse.json(verifyAuthenticationData, {
                status: 200,
              });
            },
          ),
        );
        const errorMessage = screen.getByText(/인증이 완료되었습니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 3000);
      setTimeout(() => {
        expect(verificationInput).toHaveAttribute('readOnly');
        expect(confirmBtn).toBeDisabled();
      }, 3000);
      const pwInput = await screen.findByTestId('pwInput');
      const placeholderValue = pwInput.getAttribute('placeholder');
      expect(placeholderValue).toBe('비밀번호 입력');
      fireEvent.change(pwInput, { target: { value: 'ivegaeul1' } });
      expect((pwInput as HTMLInputElement).type).toBe('password');
      expect(screen.getByTestId('pwInput')).toHaveValue('ivegaeul1');
      setTimeout(() => {
        const errorMessage = screen.getByText(
          /8~20자 영문(대,소문자)\/숫자 조합/i,
        );
        expect(errorMessage).toBeInTheDocument();
      }, 2000);
      const checkPwInput = await screen.findByTestId('checkPwInput');
      const placeholderValue2 = checkPwInput.getAttribute('placeholder');
      expect(placeholderValue2).toBe('비밀번호 재입력');
      fireEvent.change(checkPwInput, { target: { value: 'ivegaeul1' } });
      expect((checkPwInput as HTMLInputElement).type).toBe('password');
      expect(screen.getByTestId('checkPwInput')).toHaveValue('ivegaeul1');
      setTimeout(() => {
        const errorMessage = screen.getByText(/비밀번호가 일치합니다./i);
        expect(errorMessage).toBeInTheDocument();
      }, 2000);
      const successBtn = await screen.getByTestId('successBtn');
      expect(successBtn).toBeInTheDocument();
      fireEvent.click(successBtn);
      setTimeout(() => {
        expect(window.location.pathname).toBe('/signin/agreement');
      }, 3000);
    });
  });
});

describe('버튼 테스트', () => {
  let queryClient: QueryClient;
  beforeEach(() => {
    // Initialize a new QueryClient for each test
    queryClient = new QueryClient();
  });
  test('이전 버튼 클릭', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <SignUp />
      </QueryClientProvider>,
    );
    await act(async () => {
      const prevBtn = await screen.findByTestId('prevBtn');
      expect(prevBtn.textContent).toBe('이전');
      fireEvent.click(prevBtn);

      setTimeout(() => {
        expect(window.location.pathname).toBe('/signin/agreement');
      }, 5000);
    });
  });
});
