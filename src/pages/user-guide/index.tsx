import { TextBox } from '@components/text-box';
import { Button, Image } from 'antd';
import styled from 'styled-components';
import PdfLogo from '@assets/image/pdfLogo.svg';
import UserGuideHome from '@assets/image/userGuideHome.png';
import UserGuideCoupon from '@assets/image/userGuideCoupon.png';
import UserGuidePoint from '@assets/image/userGuidePoint.png';
import UserGuideAccommodation from '@assets/image/userGuideAccommodation.png';

export const UserGuide = () => {
  const handleDownLoad = () => {
    const pdfUrl =
      'https://github.com/Upjuyanolja/Upjuyanolja_FE/files/14050917/coupon-center-guide.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.click();
  };
  return (
    <StyledLayout>
      <StyledTitle>
        <TextBox typography="h4" fontWeight={700}>
          이용 가이드
        </TextBox>
        <StyledButton type="primary">
          <img src={PdfLogo} />
          <TextBox typography="body2" fontWeight={700} onClick={handleDownLoad}>
            PDF 다운로드하기
          </TextBox>
        </StyledButton>
      </StyledTitle>
      <Image src={UserGuideHome} preview={false} />
      <Image src={UserGuideCoupon} preview={false} />
      <Image src={UserGuideAccommodation} preview={false} />
      <Image src={UserGuidePoint} preview={false} />
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  margin: 32px 48px;
`;

const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 16px;
`;
const StyledButton = styled(Button)`
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
