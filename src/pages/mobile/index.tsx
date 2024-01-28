import { TextBox } from '@components/text-box';
import { Image } from 'antd';
import styled from 'styled-components';
import PCImage from '@assets/image/pcImage.png';

export const Mobile = () => {
  return (
    <StyledLayout>
      <StyledContainer>
        <TextBox color="primary" typography="h3" fontWeight={700}>
          PC에서 접속해 주세요!
        </TextBox>
        <Image preview={false} src={PCImage} alt="pc 이미지" />
        <TextBox typography="body2" fontWeight={400}>
          본 서비스는 PC 버전에 최적화되어있습니다.
        </TextBox>
        <TextBox typography="h4" fontWeight={700}>
          PC버전으로 이용해 주세요.
        </TextBox>
      </StyledContainer>
    </StyledLayout>
  );
};

const StyledLayout = styled.main`
  width: 306px;
  margin: 0 auto;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
