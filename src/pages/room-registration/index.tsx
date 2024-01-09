import { colors } from '@/constants/colors';
import { styled } from 'styled-components';
import { Form } from 'antd';
import { ButtonContainer } from '@components/init/ButtonContainer';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { NameContainer } from '@components/init/NameContainer';
import { PriceContainer } from '@components/room/price-container';

const RoomRegistration = () => {
  const isValid = true;

  const roomOptions = ['TV', '에어컨', '인터넷'];

  return (
    <StyledWrapper color={colors.white}>
      <Form>
        <NameContainer header="객실명" />
        <StyledInputWrapper>
          <PriceContainer labelText="객실 가격" />
        </StyledInputWrapper>
        <ImageUploadContainer header="객실 사진" />
        <StyledInputWrapper>
          <CheckBoxContainer options={roomOptions} header="객실 옵션" />
        </StyledInputWrapper>
        <ButtonContainer buttonStyle={'navigate'} isValid={isValid} />
      </Form>
    </StyledWrapper>
  );
};

export default RoomRegistration;

const StyledWrapper = styled.div`
  background-color: ${(props) => props.color};
  padding: 40px;
  border-radius: 8px;
`;

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
`;
