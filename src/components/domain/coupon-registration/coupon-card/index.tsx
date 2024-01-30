import { colors } from '@/constants/colors';
import { TextBox } from '@components/atom/text-box';
import styled from 'styled-components';
import { CouponCardProps } from './type';

export const CouponCard = ({ title, children }: CouponCardProps) => {
  return (
    <Container>
      <Title>
        <TextBox typography="h5" fontWeight="bold" color="primary">
          {title}
        </TextBox>
      </Title>
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled.div`
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 1px 5px 0px #0000001a;
`;

const Title = styled.div`
  padding: 8px 0 8px 8px;
  background-color: ${colors.light};
`;

const Content = styled.div`
  padding: 40px 0;
`;
