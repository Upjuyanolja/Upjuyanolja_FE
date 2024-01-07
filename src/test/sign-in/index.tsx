import { ValidateSchema } from '@/utils/sign-in/ValidateSchema';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { removeCookie, setCookie } from '@hooks/sign-in/useSignIn';
import { SIGN_IN_API } from '@api/sign-in';
import { useCustomNavigate } from '@hooks/sign-up/useSignUp';
import { Input, Button } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import Toast from '@components/layout/toast';
import { TextBox } from '@components/text-box';
import { memberData } from './type';
export const SignIn = () => {
  const { handleChangeUrl } = useCustomNavigate();
  const { showToast, ToastContainer } = Toast();
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
        const resSignIn = await SIGN_IN_API.postLogin({
          email: values.email,
          password: values.password,
        });
        const signinData: memberData = resSignIn.data.data;
        setCookie('accessToken', signinData.accessToken);
        setCookie('refreshToken', signinData.refreshToken);
        const memberResponseString = JSON.stringify(signinData.memberResponse);
        localStorage.setItem('member', memberResponseString);
        try {
          await await SIGN_IN_API.getAccomodations();
          setTimeout(() => {
            handleChangeUrl('/');
          }, 1000);
        } catch (e) {
          setTimeout(() => {
            handleChangeUrl('/init');
          }, 1000);
        }
      } catch (e) {
        showToast({
          theme: 'error',
          message: '이메일과 비밀번호를 확인해주세요',
          width: '346px',
          height: '41px',
        });
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
            <TextBox typography="body4" color="red">
              {errors.email}
            </TextBox>
          </div>
        )}
        <Input.Password
          size="large"
          placeholder="비밀번호 입력"
          iconRender={(visible) =>
            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
          data-testid="pwInput"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        ></Input.Password>
        {touched.password && errors.password && (
          <div>
            <TextBox typography="body4" color="red">
              {errors.password}
            </TextBox>
          </div>
        )}
        <Button data-testid="loginBtn" htmlType="submit">
          로그인
        </Button>
        <Button
          onClick={() => handleChangeUrl('/signin/agreement')}
          data-testid="signUpBtn"
        >
          회원가입
        </Button>
      </form>
      {ToastContainer}
    </div>
  );
};
