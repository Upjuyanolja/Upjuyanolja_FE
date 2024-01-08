import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Button, Layout, Space } from 'antd';
import { TextBox } from '@components/text-box';
import styled from 'styled-components';
import { colors } from '@/constants/colors';
import { PointBox } from '@components/point/point-box';

export const PointDetail = () => {
  return (
    <StyledLayout>
      <PointBox />
      <Space>
        <MenuButtonWrap>
          <li>
            <Button>전체</Button>
          </li>
          <li>
            <Button>충전</Button>
          </li>
          <li>
            <Button>사용</Button>
          </li>
        </MenuButtonWrap>
      </Space>
    </StyledLayout>
  );
};
const StyledLayout = styled(Layout)`
  padding: 32px 48px;
`;

const MenuButtonWrap = styled('ul')``;
