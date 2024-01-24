import { ROUTES } from '@/constants/routes';
import { ACCOMMODATION_API } from '@api/accommodation';
import { TextBox } from '@components/text-box';
import { getCookie, setCookie } from '@hooks/sign-in/useSignIn';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const NotFound = () => {
  const navigate = useNavigate();
  const handleNavigate = async () => {
    const accommodationId = getCookie('accommodationId');
    if (accommodationId) {
      navigate(`${accommodationId}${ROUTES.MAIN}`);
      return;
    }
    const { data } = await ACCOMMODATION_API.getAccommodationList();
    const hasAccommodationData = data.accommodations.length > 0;
    const accommodationIdData = data.accommodations[0].id;
    if (hasAccommodationData && accommodationIdData) {
      setCookie('accommodationId', accommodationIdData.toString());
      navigate(`${accommodationIdData}${ROUTES.MAIN}`);
      return;
    }
    navigate(ROUTES.INIT);
  };
  return (
    <StyledLayout>
      <StyledContainer>
        <div>
          <TextBox typography="h2" fontWeight={700} color="primary">
            빨리잡아!&nbsp;
          </TextBox>
          <TextBox typography="h2" fontWeight={700}>
            쿠폰센터
          </TextBox>
        </div>
        <TextBox typography="h3" fontWeight={400} color="black700">
          페이지를 찾을 수 없습니다.
        </TextBox>
      </StyledContainer>
      <StyledButton type="primary">
        <TextBox
          typography="h5"
          fontWeight={700}
          color="white"
          onClick={handleNavigate}
        >
          홈화면으로 이동
        </TextBox>
      </StyledButton>
    </StyledLayout>
  );
};

const StyledLayout = styled.main`
  margin: 0 auto;
  width: 374px;
  height: calc(100vh - 56px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 54px;
  padding: 12px 32px;
`;
