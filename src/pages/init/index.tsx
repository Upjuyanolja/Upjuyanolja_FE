import { colors } from '@/constants/colors';
import { ROUTES } from '@/constants/routes';
import { TextBox } from '@components/text-box';
import { Layout, Button } from 'antd';
import { MdOutlineAddHome } from 'react-icons/md';
import styled from 'styled-components';

export const Init = () => {
  const memberString = localStorage.getItem('member');
  const memberObj = memberString ? JSON.parse(memberString) : null;
  const name = memberObj.name;
  return (
    <StyledLayout color={colors.white}>
      <Layout.Header>Header</Layout.Header>
      <StyledContent>
        <StyledMainContent>
          <TextBox typography="h2" fontWeight={'700'}>
            반갑습니다, {name}님!
          </TextBox>
          <StyledButton
            ghost
            type="primary"
            href={ROUTES.INIT_ACCOMMODATION_REGISTRATION}
          >
            <MdOutlineAddHome />
            숙소 등록 시작하기
          </StyledButton>
        </StyledMainContent>
      </StyledContent>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  height: 100vh;
  background-color: ${(props) => props.color};
`;

const StyledContent = styled(Layout.Content)`
  width: 1024px;

  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledMainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  gap: 11px;
`;

const StyledButton = styled(Button)`
  width: 784px;
  height: 72px;

  font-size: 24px;
  font-weight: bold;

  display: flex;
  align-items: center;
  gap: 10px;
`;
