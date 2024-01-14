import { useCustomNavigate } from '@hooks/sign-up/useSignUp';
import { usePostAuthentication, usePostSignUp } from '@queries/sign-up';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, message } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { getValidateSchema } from '@/utils/sign-up/ValidateSchema';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { TextBox } from '@components/text-box';
import { SIGN_UP_API } from '@api/sign-up/index';
import { AxiosError } from 'axios';
export const SignUp = () => {
  const queryClient = useQueryClient();
  const { handleChangeUrl } = useCustomNavigate();
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [isVerifyRes, setIsVerifyRes] = useState(false);
  const [checkOne, setCheckOne] = useState(false);
  const [checkOne_1, setCheckOne_1] = useState(false);
  const [checkOne_2, setCheckOne_2] = useState(false);
  const [checkTwo, setCheckTwo] = useState(false);
  const [checkTwo_1, setCheckTwo_1] = useState(false);
  const [checkThree, setCheckThree] = useState(false);
  const [checkFour, setCheckFour] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const validationSchema = getValidateSchema(queryClient);

  const postSignUpMutation = usePostSignUp({
    onSuccess() {
      handleChangeUrl('/signup/success');
    },
  });

  const postAuthenticationMutation = usePostAuthentication({
    onSuccess: async (response) => {
      message.success({
        content: (
          <TextBox typography="body3" fontWeight={'400'}>
            인증번호가 전송되었습니다. 이메일을 확인해주세요.
          </TextBox>
        ),
        duration: 1000,
        style: {
          width: '346px',
          height: '41px',
        },
      });
      queryClient.setQueryData(['authenticationNum'], response.data.data);
      setCheckOne(true);
      setCheckOne_1(false);
      setCheckOne_2(false);
      setEmailDisabled(true);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError && error.response) {
        const errorData = error.response.data;
        if (errorData) {
          if (errorData.code == 1010) {
            setCheckOne(false);
            setCheckOne_1(true);
            setCheckOne_2(false);
          } else {
            setCheckOne(false);
            setCheckOne_1(false);
            setCheckOne_2(true);
          }
        }
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['authenticationNum']);
    },
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      verificationCode: '',
      password: '',
      checkPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const signUpData = { email: values.email, password: values.password };
        console.log(signUpData);
        await postSignUpMutation.mutateAsync(signUpData);
      } catch (e) {
        console.error(e);
      }
    },
  });

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    formik;

  const handleVerification = async () => {
    if (values.verificationCode.length > 0) {
      const num = queryClient.getQueryData<{ verificationCode: string }>([
        'authenticationNum',
      ]);

      try {
        const res = await SIGN_UP_API.getVerify({
          // 버튼을 누를 때마다 갱신된 데이터를 받아와야 하기 때문에 쿼리 사용 안했습니다. (staleTime: 0)
          email: values.email,
          verificationCode: values.verificationCode,
        });
        if (
          res.status === 200 &&
          num?.verificationCode == values.verificationCode
        ) {
          setIsVerifyRes(true);
          setCheckTwo(true);
          setCheckTwo_1(false);
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          if (
            error.response.data.code === 1010 ||
            error.response.data.code === 9001
          ) {
            setCheckTwo(false);
            setCheckTwo_1(true);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (touched.password && errors.password) {
      setCheckThree(false);
    }
    if (errors.password === undefined && values.password.length > 0) {
      setCheckThree(true);
    }
    if (
      values.password !== values.checkPassword &&
      values.checkPassword.length > 0
    ) {
      setCheckFour(false);
    }
    if (
      values.password === values.checkPassword &&
      values.checkPassword.length > 0
    ) {
      setCheckFour(true);
    }
    setIsDisabled(!(checkOne && checkTwo && checkThree && checkFour));
  }, [values.verificationCode, values.checkPassword]);

  useEffect(() => {
    setIsDisabled(!(checkOne && checkTwo && checkThree && checkFour));
  }, [checkOne, checkTwo, checkThree, checkFour]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex' }}>
          <Input
            size="large"
            placeholder="이메일 입력"
            type="text"
            data-testid="emailInput"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            readOnly={emailDisabled}
          />
          {touched.email && errors.email && <div>{errors.email}</div>}
          {checkOne && <div>사용 가능한 이메일입니다.</div>}
          {checkOne_1 && <div>입점 권한이 없는 이메일입니다.</div>}
          {checkOne_2 && <div>이미 가입된 이메일입니다.</div>}
          <Button
            data-testid="requestBtn"
            disabled={emailDisabled}
            onClick={() => {
              if (
                values.email.length > 0 &&
                (!touched.email || !errors.email)
              ) {
                postAuthenticationMutation.mutate({ email: values.email });
              }
            }}
          >
            인증요청
          </Button>
        </div>
        <div style={{ display: 'flex' }}>
          <Input
            size="large"
            placeholder="인증번호 입력"
            type="text"
            data-testid="verificationInput"
            name="verificationCode"
            value={values.verificationCode}
            onChange={handleChange}
            onBlur={handleBlur}
            readOnly={isVerifyRes}
          />
          {touched.verificationCode && errors.verificationCode && (
            <div>{errors.verificationCode}</div>
          )}
          {checkTwo && <div>인증이 완료되었습니다.</div>}
          {checkTwo_1 && <div>인증번호가 일치하지 않습니다.</div>}
          <Button
            disabled={isVerifyRes}
            onClick={() => handleVerification()}
            data-testid="confirmBtn"
          >
            인증확인
          </Button>
        </div>
        <div>
          <Input.Password
            size="large"
            placeholder="비밀번호 입력"
            iconRender={(visible) =>
              visible ? (
                <EyeOutlined data-testid="pwVisible" />
              ) : (
                <EyeInvisibleOutlined data-testid="pwInvisible" />
              )
            }
            data-testid="pwInput"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Input.Password>
          {touched.password && errors.password && (
            <div>
              <TextBox typography="body4" color="error">
                {errors.password}
              </TextBox>
            </div>
          )}
          {errors.password === undefined && values.password.length > 0 && (
            <div>8~20자 영문/숫자 조합</div>
          )}
        </div>
        <div>
          <Input.Password
            size="large"
            placeholder="비밀번호 재입력"
            iconRender={(visible) =>
              visible ? (
                <EyeOutlined data-testid="checkPwVisible" />
              ) : (
                <EyeInvisibleOutlined data-testid="checkPwInvisible" />
              )
            }
            data-testid="checkPwInput"
            name="checkPassword"
            value={values.checkPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Input.Password>
          {touched.checkPassword && errors.checkPassword && (
            <div>
              <TextBox typography="body4" color="error">
                {errors.checkPassword}
              </TextBox>
            </div>
          )}
          {values.password === values.checkPassword &&
            values.checkPassword.length > 0 && (
              <div>비밀번호가 일치합니다.</div>
            )}
        </div>
        <Button
          data-testid="prevBtn"
          onClick={() => {
            handleChangeUrl('/signin/agreement');
          }}
        >
          이전
        </Button>
        <Button
          htmlType="submit"
          data-testid="successBtn"
          disabled={isDisabled}
        >
          회원가입 완료
        </Button>
      </form>
    </div>
  );
};
