export type SignInData = {
  email: string;
  password: string;
};

export type MemberData = {
  accessToken: string;
  refreshToken: string;
  memberResponse: {
    email: string;
    name: string;
  };
};
