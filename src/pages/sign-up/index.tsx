import { HTTP_STATUS_CODE, RESPONSE_CODE } from '@/constants/api';
import { colors } from '@/constants/colors';
import { getValidateSchema } from '@/utils/sign-up/ValidateSchema';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { SIGN_UP_API } from '@api/sign-up';
import { Footer } from '@components/layout/footer';
import { TextBox } from '@components/text-box';
import { useCustomNavigate } from '@hooks/sign-up/useSignUp';
import { usePostSignUp, usePostAuthentication } from '@queries/sign-up';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Input, Layout, message } from 'antd';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
export const SignUp = () => {
  const queryClient = useQueryClient();
  const { handleChangeUrl } = useCustomNavigate();
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [isVerifyRes, setIsVerifyRes] = useState(false);
  const [checkOne, setCheckOne] = useState(false);
  const [checkOne_1, setCheckOne_1] = useState(false);
  const [checkOne_2, setCheckOne_2] = useState(false);
  const [checkOne_3, setCheckOne_3] = useState(false);
  const [checkTwo, setCheckTwo] = useState(false);
  const [checkTwo_1, setCheckTwo_1] = useState(false);
  const [checkThree, setCheckThree] = useState(false);
  const [checkFour, setCheckFour] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [verifyError, setVerifyError] = useState(false);

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
        duration: 2,
        style: {
          width: '1000px',
          height: '41px',
        },
      });
      queryClient.setQueryData(['authenticationNum'], response.data.data);
      setCheckOne(true);
      setCheckOne_1(false);
      setCheckOne_2(false);
      setCheckOne_3(false);
      setEmailDisabled(true);
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError && error.response) {
        const errorData = error.response.data;
        if (errorData) {
          if (errorData.code === RESPONSE_CODE.INCORRECT_EMAIL_CODE) {
            setCheckOne(false);
            setCheckOne_1(true);
            setCheckOne_2(false);
            setCheckOne_3(false);
          } else if (errorData.code === RESPONSE_CODE.REQUEST_BODY_ERROR) {
            setCheckOne(false);
            setCheckOne_1(false);
            setCheckOne_2(true);
            setCheckOne_3(false);
          } else {
            setCheckOne(false);
            setCheckOne_1(false);
            setCheckOne_2(false);
            setCheckOne_3(true);
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
          res.status === HTTP_STATUS_CODE.SUCCESS &&
          num?.verificationCode == values.verificationCode
        ) {
          setIsVerifyRes(true);
          setCheckTwo(true);
          setCheckTwo_1(false);
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          if (
            error.response.data.code === RESPONSE_CODE.INCORRECT_EMAIL_CODE ||
            error.response.data.code === RESPONSE_CODE.REQUEST_BODY_ERROR
          ) {
            setCheckTwo(false);
            setCheckTwo_1(true);
          }
        }
      }
    } else {
      setVerifyError(true);
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

  useEffect(() => {
    if (values.email.length >= 0) {
      setEmailError(false);
      setCheckOne_1(false);
      setCheckOne_2(false);
    } else if (values.verificationCode.length > 0) {
      setVerifyError(false);
    }
  }, [values.email, values.verificationCode]);

  return (
    <StyledLayout>
      <StyledContent>
        <TitleContainer>
          <TextBox
            typography="h2"
            fontWeight={'700'}
            textAlign="center"
            cursor="default"
          >
            회원 정보 입력
          </TextBox>
        </TitleContainer>
        <FormContainer onSubmit={handleSubmit}>
          <EmailContainer>
            <TextBox typography="body2" fontWeight={'400'} cursor="default">
              이메일
            </TextBox>
            <EmailInner>
              <EmailInput>
                <StyledInput
                  size="large"
                  placeholder="이메일 입력"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly={emailDisabled}
                  style={{
                    borderColor: checkOne_1
                      ? `${colors.error}`
                      : checkOne_2
                        ? `${colors.error}`
                        : emailError
                          ? `${colors.error}`
                          : values.email.length === 0
                            ? errors.email && touched.email
                              ? `${colors.error}`
                              : `${colors.black600}`
                            : errors.email && touched.email
                              ? `${colors.error}`
                              : `${colors.success}`,
                  }}
                />
                {emailError && (
                  <TextBox typography="body4" fontWeight={'400'} color="error">
                    이메일 형식이 올바르지 않습니다.
                  </TextBox>
                )}
                {emailError ||
                  (touched.email && errors.email && (
                    <TextBox
                      typography="body4"
                      fontWeight={'400'}
                      color="error"
                    >
                      {errors.email}
                    </TextBox>
                  ))}
                {checkOne && (
                  <TextBox
                    typography="body4"
                    fontWeight={'400'}
                    color="success"
                    cursor="default"
                  >
                    사용 가능한 이메일입니다.
                  </TextBox>
                )}
                {checkOne_1 && (
                  <TextBox
                    typography="body4"
                    fontWeight={'400'}
                    color="error"
                    cursor="default"
                  >
                    입점 권한이 없는 이메일입니다.
                  </TextBox>
                )}
                {checkOne_2 && (
                  <TextBox
                    typography="body4"
                    fontWeight={'400'}
                    color="error"
                    cursor="default"
                  >
                    이메일 형식이 올바르지 않습니다.
                  </TextBox>
                )}
                {checkOne_3 && (
                  <TextBox
                    typography="body4"
                    fontWeight={'400'}
                    color="error"
                    cursor="default"
                  >
                    이미 가입된 이메일입니다.
                  </TextBox>
                )}
              </EmailInput>
              <ButtonInput>
                <StyledButton
                  disabled={emailDisabled}
                  onClick={() => {
                    if (
                      values.email.length > 0 &&
                      (!touched.email || !errors.email)
                    ) {
                      postAuthenticationMutation.mutate({
                        email: values.email,
                      });
                    } else if (values.email.length === 0) {
                      setEmailError(true);
                    }
                  }}
                >
                  <TextBox
                    typography="h5"
                    fontWeight={'500'}
                    textAlign="center"
                    color={emailDisabled ? 'white' : 'primary'}
                  >
                    인증요청
                  </TextBox>
                </StyledButton>
              </ButtonInput>
            </EmailInner>
            <EmailInner>
              <EmailInput>
                <StyledInput
                  size="large"
                  placeholder="인증번호 입력"
                  type="text"
                  name="verificationCode"
                  value={values.verificationCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  readOnly={isVerifyRes}
                  style={{
                    borderColor: verifyError
                      ? `${colors.error}`
                      : values.verificationCode.length === 0
                        ? errors.verificationCode && touched.verificationCode
                          ? `${colors.error}`
                          : `${colors.black600}`
                        : isVerifyRes
                          ? `${colors.success}`
                          : `${colors.error}`,
                  }}
                />
                {verifyError && (
                  <TextBox
                    typography="body4"
                    fontWeight={'400'}
                    color="error"
                    cursor="default"
                  >
                    인증번호를 입력하세요.
                  </TextBox>
                )}
                {touched.verificationCode && errors.verificationCode && (
                  <TextBox
                    typography="body4"
                    fontWeight={'400'}
                    color="error"
                    cursor="default"
                  >
                    {errors.verificationCode}
                  </TextBox>
                )}
                {checkTwo && (
                  <TextBox
                    typography="body4"
                    fontWeight={'400'}
                    color="success"
                    cursor="default"
                  >
                    인증이 완료되었습니다.
                  </TextBox>
                )}
                {checkTwo_1 && (
                  <TextBox
                    typography="body4"
                    fontWeight={'400'}
                    color="error"
                    cursor="default"
                  >
                    인증번호가 일치하지 않습니다.
                  </TextBox>
                )}
              </EmailInput>
              <ButtonInput>
                <StyledButton
                  disabled={isVerifyRes}
                  onClick={() => handleVerification()}
                >
                  <TextBox
                    typography="h5"
                    fontWeight={'500'}
                    textAlign="center"
                    color={isVerifyRes ? 'white' : 'primary'}
                  >
                    인증확인
                  </TextBox>
                </StyledButton>
              </ButtonInput>
            </EmailInner>
            <PasswordInput>
              <TextBox typography="body2" fontWeight={'400'} cursor="default">
                비밀번호
              </TextBox>
              <StyledInputPassword
                size="large"
                placeholder="비밀번호 입력"
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    values.password.length === 0
                      ? errors.password && touched.password
                        ? `${colors.error}`
                        : `${colors.black600}`
                      : errors.password && touched.password
                        ? `${colors.error}`
                        : `${colors.success}`,
                }}
              ></StyledInputPassword>
              {touched.password && errors.password && (
                <TextBox typography="body4" color="error">
                  {errors.password}
                </TextBox>
              )}
              {errors.password === undefined && values.password.length > 0 && (
                <TextBox typography="body4" fontWeight={'400'} color="black600">
                  8~20자 영문/숫자 조합
                </TextBox>
              )}
            </PasswordInput>
            <PasswordInput>
              <TextBox typography="body2" fontWeight={'400'} cursor="default">
                비밀번호 확인
              </TextBox>
              <StyledInputPassword
                size="large"
                placeholder="비밀번호 재입력"
                iconRender={(visible) =>
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
                name="checkPassword"
                value={values.checkPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{
                  borderColor:
                    values.checkPassword.length === 0
                      ? errors.checkPassword && touched.checkPassword
                        ? `${colors.error}`
                        : `${colors.black600}`
                      : errors.checkPassword && touched.checkPassword
                        ? `${colors.error}`
                        : `${colors.success}`,
                }}
              ></StyledInputPassword>
              {touched.checkPassword && errors.checkPassword && (
                <TextBox typography="body4" color="error">
                  {errors.checkPassword}
                </TextBox>
              )}
              {values.password === values.checkPassword &&
                values.checkPassword.length > 0 && (
                  <TextBox typography="body4" color="success">
                    비밀번호가 일치합니다.
                  </TextBox>
                )}
            </PasswordInput>
            <ButtonContainer>
              <StyledPrevButton
                onClick={() => {
                  handleChangeUrl('/signin/agreement');
                }}
              >
                <TextBox
                  typography="h5"
                  fontWeight={'700'}
                  textAlign="center"
                  color="primary"
                >
                  이전
                </TextBox>
              </StyledPrevButton>
              <StyledDoneButton
                htmlType="submit"
                disabled={isDisabled}
                type="primary"
              >
                <TextBox
                  typography="h5"
                  fontWeight={'700'}
                  textAlign="center"
                  color="white"
                >
                  회원가입 완료
                </TextBox>
              </StyledDoneButton>
            </ButtonContainer>
          </EmailContainer>
        </FormContainer>
      </StyledContent>
      <Footer />
    </StyledLayout>
  );
};
const StyledLayout = styled(Layout)`
  max-width: 100vw;
  background-color: white;
`;

const StyledContent = styled(Layout.Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 666px;
  gap: 16px;
`;

const TitleContainer = styled.div``;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 390px;
`;

const StyledInput = styled(Input)`
  height: 54px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  &:read-only {
    border: 1px solid ${colors.success};
  }
`;

const StyledButton = styled(Button)`
  width: 112px;
  height: 54px;
  border: 1px solid ${colors.primary};
  &:disabled {
    background-color: ${colors.black600};
  }
`;

const EmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EmailInner = styled.div`
  display: flex;
  gap: 8px;
`;

const EmailInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 266px;
  gap: 8px;
`;

const ButtonInput = styled.div``;

const PasswordInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

const StyledInputPassword = styled(Input.Password)`
  height: 54px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const StyledPrevButton = styled(Button)`
  width: 126px;
  height: 54px;
  border-radius: 2px;
  border: 1px solid ${colors.primary};
`;

const StyledDoneButton = styled(Button)`
  width: 256px;
  height: 54px;
  border: 1px solid ${colors.primary};
  &:disabled {
    background-color: ${colors.black600};
  }
`;
