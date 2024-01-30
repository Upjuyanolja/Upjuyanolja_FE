import { TextBox } from '@components/atom/text-box';
import { Button } from 'antd';
import styled from 'styled-components';

export const ServerError = () => {
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
          페이지가 작동하지 않습니다
        </TextBox>
      </StyledContainer>
      <StyledButton
        type="primary"
        onClick={() => {
          window.location.reload();
        }}
      >
        <TextBox typography="h5" fontWeight={700} color="white">
          새로고침
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
