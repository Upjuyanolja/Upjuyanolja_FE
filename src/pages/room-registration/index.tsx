import { colors } from '@/constants/colors';
import { styled } from 'styled-components';
import { Form } from 'antd';
import { TextBox } from '@components/text-box';
import { RightOutlined } from '@ant-design/icons';
import { ButtonContainer } from '@components/init/ButtonContainer';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { NameContainer } from '@components/init/NameContainer';
import { PriceContainer } from '@components/room/price-container';
import { CapacityContainer } from '@components/room/capacity-container';
import { NumOfRoomsContainer } from '@components/room/num-of-rooms-container';
import { TimeContainer } from '@components/room/time-container';

const RoomRegistration = () => {
  const isValid = true;
  const roomOptions = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };

  return (
    <StyledFullContainer>
      <StyledHeaderContainer>
        <TextBox typography="h4" fontWeight={700}>
          객실 관리
        </TextBox>
        <RightOutlined />
        <TextBox typography="h4" fontWeight={700}>
          객실 추가 등록
        </TextBox>
      </StyledHeaderContainer>
      <StyledWrapper color={colors.white}>
        <Form>
          <NameContainer
            header="객실명"
            placeholder="객실명을 입력해 주세요. (ex. 디럭스 더블 룸)"
          />
          <StyledInputWrapper>
            <PriceContainer header="객실 가격" />
          </StyledInputWrapper>
          <ImageUploadContainer header="객실 사진" />
          <StyledInputWrapper>
            <NumOfRoomsContainer header="객실 수" />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <TimeContainer header="시간" />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <CapacityContainer header="인원" />
          </StyledInputWrapper>
          <StyledInputWrapper>
            <CheckBoxContainer options={roomOptions} header="객실 옵션" />
          </StyledInputWrapper>
          <ButtonContainer buttonStyle={'navigate'} isValid={isValid} />
        </Form>
      </StyledWrapper>
    </StyledFullContainer>
  );
};

export default RoomRegistration;

const StyledFullContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background-color: ${colors.midGray};
`;

const StyledHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 768px;
  padding: 0px 48px;
  margin-top: 32px;
  gap: 8px;
  align-items: center;
  background-color: ${colors.midGray};
  box-sizing: border-box;
`;

const StyledWrapper = styled.div`
  border-radius: 8px;
  padding: 40px;
  margin: 16px 48px 32px 48px;
  max-width: 768px;
  background-color: ${(props) => props.color};
`;

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
`;
