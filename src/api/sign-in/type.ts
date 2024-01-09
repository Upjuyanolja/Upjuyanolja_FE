export type signInData = {
  email: string;
  password: string;
};

export type memberData = {
  accessToken: string;
  refreshToken: string;
  memberResponse: {
    email: string;
    name: string;
  };
};
