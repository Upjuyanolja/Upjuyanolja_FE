import { TextBox } from '@components/text-box';
import { Button } from 'antd';
import styled from 'styled-components';

export const NotFoundCoupon = () => {
  return (
    <StyledLayout>
      <StyledTextBox>
        <TextBox fontWeight={400} typography="body1" color="black700">
          쿠폰이 없습니다
        </TextBox>
        <TextBox fontWeight={700} typography="body1" color="black700">
          먼저 새 쿠폰을 만들어주세요
        </TextBox>
      </StyledTextBox>
      <StyledButton type="primary">
        <TextBox fontWeight={700} typography="h5" color="white">
          쿠폰 만들기
        </TextBox>
      </StyledButton>
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  height: calc(100% - 210px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;

const StyledTextBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const StyledButton = styled(Button)`
  width: 196px;
  height: 46px;
  border-radius: 2px;
`;
