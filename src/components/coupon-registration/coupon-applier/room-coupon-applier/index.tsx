import { TextBox } from '@components/text-box';
import { Checkbox, Input } from 'antd';
import styled from 'styled-components';

export const RoomCouponApplier = ({ roomName }: RoomCouponApplierProps) => {
  return (
    <Container>
      <StyledLeftWrap>
        <Checkbox />
        <TextBox typography="h5" fontWeight="bold" color="black900">
          {roomName}
        </TextBox>
      </StyledLeftWrap>
      <StyledRightWrap>
        <StyledInput size="small" maxLength={4} />
        <TextBox typography="body1" color="black900">
          장
        </TextBox>
      </StyledRightWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLeftWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const StyledRightWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledInput = styled(Input)`
  width: 114px;
  height: 40px;
`;
export type RoomCouponApplierProps = {
  roomName: string;
};
