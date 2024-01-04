import { useCustomNavigate } from '../../hooks/sign-up/useSignUp';
import React from 'react';

function SignUpSuccess() {
  const { handleChangeUrl } = useCustomNavigate();
  return (
    <button onClick={() => handleChangeUrl('/signin')} data-testid="btn">
      로그인 하러 가기
    </button>
  );
}

export default SignUpSuccess;
