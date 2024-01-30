import { ValidateSchema } from '@/utils/sign-in/ValidateSchema';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { removeCookie, setCookie } from '@hooks/sign-in/useSignIn';
import { useCustomNavigate } from '@hooks/sign-up/useSignUp';
import { Input, Button, message } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import { TextBox } from '@components/atom/text-box';
import { usePostLogin } from '@queries/sign-in';
import { useSideBar } from '@hooks/side-bar/useSideBar';
import { AxiosError } from 'axios';

export const SignIn = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const { accommodationListData } = useSideBar();
  const postLoginMutation = usePostLogin({
    onSuccess: (response) => {
      setCookie('accessToken', response.data.accessToken);
      setCookie('refreshToken', response.data.accessToken);
    },
  });

  const isAccomodationList = () => {
    if (
      accommodationListData?.accommodations &&
      accommodationListData.accommodations.length > 0
    ) {
      return true;
    } else {
      return false;
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
        removeCookie('accessToken');
        removeCookie('refreshToken');
        await postLoginMutation.mutateAsync(values);
        try {
          const res = isAccomodationList();
          if (res === true) {
            handleChangeUrl('/');
          } else {
            handleChangeUrl('/init');
          }
        } catch (e) {
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
        }
      } catch (e) {
        if (e instanceof AxiosError && e.response) {
          if (e.response.status === 500) {
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
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          size="large"
          placeholder="이메일 입력"
          type="text"
          data-testid="emailInput"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        ></Input>
        {touched.email && errors.email && (
          <div>
            <TextBox typography="body4" color="error">
              {errors.email}
            </TextBox>
          </div>
        )}
        <Input.Password
          size="large"
          placeholder="비밀번호 입력"
          iconRender={(visible) =>
            visible ? (
              <EyeOutlined data-testid="visible" />
            ) : (
              <EyeInvisibleOutlined data-testid="invisible" />
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
        <Button data-testid="signInBtn" htmlType="submit">
          로그인
        </Button>
        <Button
          onClick={() => handleChangeUrl('/signin/agreement')}
          data-testid="signUpBtn"
        >
          회원가입
        </Button>
      </form>
    </div>
  );
};
