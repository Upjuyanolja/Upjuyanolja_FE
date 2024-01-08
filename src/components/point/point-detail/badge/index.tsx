import { colors } from '@/constants/colors';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';

export const OrderStatusBadge = ({
  status,
}: {
  status: '구매 확정' | '결제 완료' | '취소 완료';
}) => {
  const [color, setColor] = useState('');

  useEffect(() => {
    switch (status) {
      case '구매 확정':
        setColor(colors.primary);
        break;
      case '결제 완료':
        setColor(colors.subOrange);
        break;
      case '취소 완료':
        setColor(colors.black500);
        break;
      default:
        break;
    }
  }, [status]);

  return <StyledBadge color={color}>{status}</StyledBadge>;
};

const StyledBadge = styled('div')`
  background-color: ${colors.white200};

  font-size: 14px;
  color: ${(props) => props.color};

  padding: 2px 8px;
  text-align: center;
`;