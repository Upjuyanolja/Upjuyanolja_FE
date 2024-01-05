import { Footer } from '@components/layout/footer';
import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
export const SignInAgreement = () => {
  return (
    <StyledLayout>
      <StyledContent>
        <TextContainer>
          <TextBox
            typography="h2"
            cursor="default"
            color={'primary'}
            fontWeight={'700'}
            textAlign="center"
          >
            서비스{' '}
          </TextBox>
          <TextBox
            typography="h2"
            cursor="default"
            color={'black900'}
            fontWeight={'700'}
            textAlign="center"
          >
            이용 동의
          </TextBox>
        </TextContainer>
      </StyledContent>
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

const TextContainer = styled.div``;
