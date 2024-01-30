import { RightOutlined } from '@ant-design/icons';
import { TextBox } from '@components/atom/text-box';
import { Button, Image } from 'antd';
import womanImage from '@assets/image/mainWomanImage.png';
import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { UserGuideNavigationContainerProps } from './type';

export const UserGuidNavigationContainer = ({
  navigateUserGuide,
}: UserGuideNavigationContainerProps) => {
  return (
    <StyledContainer>
      <StyledTextContainer>
        <TextBox typography="h5" color="primary">
          빨리잡아! 쿠폰센터
        </TextBox>
        <StyledButton type="link" onClick={navigateUserGuide}>
          이용가이드 <RightOutlined color="white" />
        </StyledButton>
      </StyledTextContainer>
      <Image width={82} height={100} src={womanImage} preview={false} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 224px;
  height: 185px;

  border: 2px solid ${colors.primary};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  overflow: hidden;
`;

const StyledTextContainer = styled.div`
  padding: 18px 24px 0;
`;
const StyledButton = styled(Button)`
  padding: 0;
  border: 0;
  color: ${colors.primary};

  font-size: 24px;
  font-weight: 700;
`;
