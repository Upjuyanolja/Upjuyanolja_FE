import { Button, Space } from 'antd';
import styled from 'styled-components';
import TextBox from '@components/text';

function UserProfile() {
  return (
    <Space
      direction="vertical"
      align="center"
      style={{ display: 'flex', gap: '4px', padding: '24px 30px' }}
    >
      <TextBox typography="h5" color={'primary'} bold={true}>
        김업주 님
      </TextBox>
      <TextBox typography="h1" color={'black900'} bold={true}>
        330,000 P
      </TextBox>
      <div style={{ marginTop: '8px' }}>
        <StyledButton type="primary" size="large">
          포인트 추가하기
        </StyledButton>
      </div>
    </Space>
  );
}

export default UserProfile;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4.6rem;
  width: 19.6rem;
`;
