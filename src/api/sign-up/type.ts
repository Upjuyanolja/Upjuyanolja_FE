export type SignUpData = {
  email: string;
  password: string;
};

export type AuthenticationData = {
  email: string;
};

export type VerificationData = {
  email: string;
  verificationCode: string;
};

export type PostSignUpResData = {
  message: string;
  data: {
    id: number;
    email: string;
    name: string;
  };
};

export type PostAuthenticationData = {
  message: string;
  data: {
    verificationCode: string;
  };
};

export type GetVerificationData = {
  message: string;
  data: string;
};
