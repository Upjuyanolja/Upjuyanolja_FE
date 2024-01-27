import * as yup from 'yup';

export const getValidateSchema = () => {
  return yup.object({
    email: yup
      .string()
      .matches(/^[^@\s]+@[^\s]+\.[^@\s]+$/, '이메일 형식이 올바르지 않습니다.')
      .required('이메일을 입력하세요.'),
    verificationCode: yup.string().required('인증번호를 입력하세요.'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
        '영문, 숫자 포함 8~20자로 입력해주세요.',
      )
      .required('영문, 숫자 포함 8~20자로 입력해주세요.'),
    checkPassword: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.'),
  });
};
