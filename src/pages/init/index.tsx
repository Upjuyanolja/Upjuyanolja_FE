import { Layout, Typography, Button } from 'antd';
import { MdOutlineAddHome } from 'react-icons/md';
import styled from 'styled-components';

export const Init = () => {
  const { Title } = Typography;
  const name = '신현진';

  return (
    <StyledLayout>
      <Layout.Header>Header</Layout.Header>
      <StyledContent>
        <MainContent>
          {/*antd 커스터마이징 후 수정 */}
          <Title level={2} style={{ fontSize: '36px' }}>
            반갑습니다, {name}님!
          </Title>
          <StyledButton
            ghost
            type="primary"
            href="/init/accommodation-registration"
          >
            <MdOutlineAddHome />
            숙소 등록 시작하기
          </StyledButton>
        </MainContent>
      </StyledContent>
    </StyledLayout>
  );
};

const StyledLayout = styled(Layout)`
  height: 100vh;
  background-color: white;
`;

const StyledContent = styled(Layout.Content)`
  width: 102.4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
`;

const StyledButton = styled(Button)`
  width: 78.4rem;
  height: 7.2rem;
  font-size: 2.4rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
