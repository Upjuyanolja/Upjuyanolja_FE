import { TextBox } from '@components/text-box';
import { useCouponRoomProvider } from '@hooks/coupon-registration/useCouponRoomProvider';
import { Checkbox, Input } from 'antd';
import styled from 'styled-components';

export const CommonQuantityCouponSetter = () => {
  const { allQuantityValue, handleAllQuantityValueChange } =
    useCouponRoomProvider();
  return (
    <Container>
      <StyledCheckBoxWrap>
        <Checkbox id="checkboxAll" />
        <label htmlFor="checkboxAll">
          <TextBox typography="h5" color="primaryHover" fontWeight="bold">
            수량 일괄 적용
          </TextBox>
        </label>
      </StyledCheckBoxWrap>
      <StyledInputWrap>
        <StyledInput
          size="small"
          maxLength={4}
          value={allQuantityValue}
          onChange={handleAllQuantityValueChange}
        />
        <TextBox typography="body1" color="black900">
          장
        </TextBox>
      </StyledInputWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 18px;
`;

const StyledCheckBoxWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledInput = styled(Input)`
  width: 114px;
  height: 40px;
`;
