import { colors } from '@/constants/colors';
import { NavigationMap } from '@/constants/navigation';
import { TextBox } from '@components/text-box';
import { isCouponModifiedState } from '@stores/coupon/atom';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

export const Navigation = () => {
  const isCouponModified = useRecoilValue(isCouponModifiedState);
  const navigate = useNavigate();
  const handleNavigate = (link: string) => {
    if (isCouponModified) {
      Modal.confirm({
        title: '수정사항이 저장되지 않았습니다.',
        content: '페이지를 나가겠습니까?',
        cancelText: '나가기',
        okText: '취소',
        className: 'confirm-modal',
        onCancel: () => {
          navigate(link);
        },
      });
    } else {
      navigate(link);
    }
  };
  return (
    <nav>
      <StyledNavWrap>
        {Object.entries(NavigationMap()).map(([key, { label, link }]) => (
          <StyledNavItem
            key={key}
            onClick={() => {
              handleNavigate(link);
            }}
          >
            <TextBox
              typography="body2"
              color="black900"
              fontWeight="bold"
              cursor="pointer"
            >
              {label}
            </TextBox>
          </StyledNavItem>
        ))}
      </StyledNavWrap>
    </nav>
  );
};

const StyledNavWrap = styled.ul`
  padding: 0;
  margin-bottom: 0;
`;

const StyledNavItem = styled.li`
  padding: 8px 0 8px 16px;
  border-bottom: 0.5px solid ${colors.black500};
  cursor: pointer;
  a {
    display: block;
  }
  &:hover {
    background-color: ${colors.lightHover};
  }
  &:active {
    background-color: ${colors.lightActive};
  }
`;
