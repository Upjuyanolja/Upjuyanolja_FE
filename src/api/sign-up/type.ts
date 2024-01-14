export type signUpData = {
  email: string;
  password: string;
};

export type authenticationData = {
  email: string;
};

export type verificationData = {
  email: string;
  verificationCode: string;
};

export type postSignUpResData = {
  message: string;
  data: {
    id: number;
    email: string;
    name: string;
  };
};

export type postAuthenticationData = {
  message: string;
  data: {
    verificationCode: string;
  };
};

export type getVerificationData = {
  message: string;
  data: string;
};
