import { Footer } from '@components/layout/footer';
import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';
export const SignInAgreement = () => {
  return (
    <StyledLayout>
      <StyledContent>sign-in-agreement-page</StyledContent>
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
`;
