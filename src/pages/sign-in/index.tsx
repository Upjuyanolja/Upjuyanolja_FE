import React from 'react';
import styled from 'styled-components';
import { Footer } from '@components/layout/footer';
import { Main } from '@components/sign-up';
import { ValidateSchema } from '@/utils/sign-in/ValidateSchema';
import { getCookie, setCookie } from '@hooks/sign-in/useSignIn';
import { useCustomNavigate } from '@hooks/sign-up/useSignUp';
import { usePostLogin } from '@queries/sign-in';
import { useFormik } from 'formik';
import { Layout, Input, Button, message } from 'antd';
import { TextBox } from '@components/text-box';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useSideBar } from '@hooks/side-bar/useSideBar';
import { AxiosError } from 'axios';
import { HTTP_STATUS_CODE } from '@/constants/api';
import { colors } from '@/constants/colors';
import { SignInData } from '@api/sign-in/type';
import { ACCOMMODATION_API } from '@api/accommodation';

export const SignIn = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const { mutate } = usePostLogin({
    onSuccess: async (response) => {
      try {
        setCookie('accessToken', response.data.accessToken);
        setCookie('refreshToken', response.data.refreshToken);
        const { data } = await ACCOMMODATION_API.getAccommodationList();
        const hasAccommodationData = data.accommodations.length > 0;
        const memberResponse = response.data.memberResponse;
        const memberData = JSON.stringify(memberResponse);
        localStorage.setItem('member', memberData);
        if (hasAccommodationData) {
          const firstAccommodationId = data.accommodations[0].id;
          setCookie('accommodationId', firstAccommodationId);
          const accommodationId = getCookie('accommodationId');
          setTimeout(() => {
            handleChangeUrl(`/${accommodationId}/main`);
          }, 1000);
        } else {
          setTimeout(() => {
            handleChangeUrl('/init');
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    },
    onError() {
      message.error({
        content: (
          <TextBox typography="body3" fontWeight={'400'}>
            이메일과 비밀번호를 확인해 주세요.
          </TextBox>
        ),
        duration: 2,
      });
    },
  });

  const handleOnclick = () => {
    if (
      (errors.email && touched.email) ||
      (errors.password && errors.email) ||
      !values.email ||
      !values.password
    ) {
      message.error({
        content: (
          <TextBox typography="body3" fontWeight={'400'}>
            이메일과 비밀번호를 확인해 주세요.
          </TextBox>
        ),
        duration: 2,
        style: {
          width: '346px',
          height: '41px',
        },
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: ValidateSchema,
    onSubmit: async (values) => {
      try {
        const signInData: SignInData = {
          email: values.email,
          password: values.password,
        };
        await mutate(signInData);
      } catch (e) {
        if (e instanceof AxiosError && e.response) {
          if (e.response.status === HTTP_STATUS_CODE.BAD_GATEWAY) {
            message.error({
              content: (
                <TextBox typography="body3" fontWeight={'400'}>
                  요청에 실패했습니다. 잠시 후 다시 시도해 주세요.
                </TextBox>
              ),
              duration: 2,
              style: {
                width: '346px',
                height: '41px',
              },
            });
          } else {
            message.error({
              content: (
                <TextBox typography="body3" fontWeight={'400'}>
                  이메일과 비밀번호를 확인해 주세요.
                </TextBox>
              ),
              duration: 2,
              style: {
                width: '346px',
                height: '41px',
              },
            });
          }
        }
      }
    },
  });

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <StyledLayout>
      <StyledContent>
        <Main />
        <LoginContainer>
          <FormContainer onSubmit={handleSubmit}>
            <StyledInput
              size="large"
              placeholder="이메일 입력"
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <TextBox typography="body4" color="error">
                {errors.email}
              </TextBox>
            )}
            <StyledPassword
              size="large"
              placeholder="비밀번호 입력"
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <TextBox typography="body4" color="error">
                {errors.password}
              </TextBox>
            )}
            <ButtonContainer>
              <StyledButton
                htmlType="submit"
                type="primary"
                onClick={handleOnclick}
              >
                <TextBox
                  typography="h5"
                  color="white"
                  fontWeight={'700'}
                  textAlign="center"
                >
                  로그인
                </TextBox>
              </StyledButton>
            </ButtonContainer>
          </FormContainer>
        </LoginContainer>
        <SignUpContainer>
          <TextContainer>
            <TextBox
              typography="body3"
              fontWeight={'700'}
              color="primary"
              cursor="default"
            >
              빨리잡아! 비즈니스 센터
            </TextBox>
            <TextBox
              typography="body3"
              fontWeight={'700'}
              color="black900"
              cursor="default"
            >
              에서 입점 등록 후 회원가입 가능합니다.
            </TextBox>
          </TextContainer>
          <StyledButton onClick={() => handleChangeUrl('/signin/agreement')}>
            <TextBox
              typography="h5"
              color="primary"
              fontWeight={'700'}
              textAlign="center"
            >
              회원가입
            </TextBox>
          </StyledButton>
        </SignUpContainer>
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
  gap: 52px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  width: 374px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledInput = styled(Input)`
  height: 54px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
`;

const StyledPassword = styled(StyledInput.Password)`
  height: 54px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
`;

const ButtonContainer = styled.div``;

const StyledButton = styled(Button)`
  width: 100%;
  height: 54px;
  border-radius: 2px;
  padding: 12px 32px 12px 32px;
  border: 1px solid ${colors.primary};
`;

const SignUpContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TextContainer = styled.div`
  margin: 0 auto;
`;
