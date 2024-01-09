import { SignIn } from '@/test/sign-in';
import { Footer } from '@components/layout/footer';
import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';
export const SignUp = () => {
  return (
    <StyledLayout>
      <StyledContent>sign-up-page</StyledContent>
      <Footer />
      <SignIn />
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
`;
