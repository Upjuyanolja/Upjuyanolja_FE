import { colors } from '@/constants/colors';
import { TextBox } from '@components/text-box';
import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';

export const Footer = () => {
  return (
    <StyledLayout>
      <Container>
        <HrefContainer>
          <TextBox
            typography="body5"
            color={'black900'}
            textAlign="center"
            fontWeight={'400'}
            cursor="pointer"
          >
            <a
              href="https://terms.yanolja.com/basicTerms
            "
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              이용약관
            </a>
          </TextBox>
          <TextBox
            typography="body5"
            color={'black900'}
            textAlign="center"
            fontWeight={'700'}
          >
            |
          </TextBox>
          <TextBox
            typography="body5"
            color={'black900'}
            textAlign="center"
            fontWeight={'400'}
            cursor="pointer"
          >
            <a
              href="https://terms.yanolja.com/privacyUse"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              개인정보 처리방침
            </a>
          </TextBox>
        </HrefContainer>
        <TextContainer>
          <TextBox
            typography="body5"
            color={'black600'}
            textAlign="center"
            fontWeight={'400'}
          >
            (주) 야놀자 Copyright © 2005-2023 Yanolja Co., Ltd. All rights
            reserved.
          </TextBox>
        </TextContainer>
      </Container>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  width: 100%;
  background-color: ${colors.midGray};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 4px;
`;

const HrefContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 9.5px;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 9.5px;
`;
