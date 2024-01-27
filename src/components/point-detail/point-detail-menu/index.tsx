import { Button, Space } from 'antd';
import styled from 'styled-components';

import { colors } from '@/constants/colors';
import { menuStatusState } from '@stores/point-detail/atoms';
import { useRecoilState } from 'recoil';
import { menuStatusType } from '@api/point-detail/get-point-detail/type';

export const PointMenu = () => {
  const [menuStatus, setMenuStatus] = useRecoilState(menuStatusState);

  const handleClickMenuButton = (status: menuStatusType) => {
    setMenuStatus(status);
  };

  return (
    <Space>
      <StyledMenuButtonWrap>
        <li>
          <StyledButton
            data-testid="menuStatusTotalButton"
            type={menuStatus === 'total' ? 'primary' : undefined}
            onClick={() => handleClickMenuButton('total')}
          >
            전체
          </StyledButton>
        </li>
        <li>
          <StyledButton
            data-testid="menuStatusChargesButton"
            type={menuStatus === 'charges' ? 'primary' : undefined}
            onClick={() => handleClickMenuButton('charges')}
          >
            충전
          </StyledButton>
        </li>
        <li>
          <StyledButton
            data-testid="menuStatusUsageButton"
            type={menuStatus === 'usages' ? 'primary' : undefined}
            onClick={() => handleClickMenuButton('usages')}
          >
            사용
          </StyledButton>
        </li>
      </StyledMenuButtonWrap>
    </Space>
  );
};
const StyledMenuButtonWrap = styled('ul')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  padding: 0;

  li {
    list-style-type: none;

    margin: 0;
  }
`;
const StyledButton = styled(Button)`
  width: 80px;
  height: 33px;

  border-color: ${colors.primary};
  border-radius: 2px;

  background-color: ${(props) =>
    props.type === 'primary' ? colors.primary : colors.white};
  color: ${(props) =>
    props.type === 'primary' ? colors.white : colors.primary};
`;
