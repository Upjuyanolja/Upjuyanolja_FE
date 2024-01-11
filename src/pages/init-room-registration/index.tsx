import { colors } from '@/constants/colors';
import { ButtonContainer } from '@components/init/ButtonContainer';
import { CheckBoxContainer } from '@components/init/CheckBoxContainer';
import { ImageUploadContainer } from '@components/init/ImageUploadContainer';
import { NameContainer } from '@components/init/NameContainer';
import { PriceContainer } from '@components/room/price-container';
import { Form } from 'antd';
import styled from 'styled-components';

export const InitRoomRegistration = () => {
  const [form] = Form.useForm();
  const isValid = true;

  const roomOptions = {
    tv: 'TV',
    airCondition: '에어컨',
    internet: '인터넷',
  };

  return (
    <StyledWrapper>
      <Form form={form}>
        <NameContainer
          header="객실명"
          form={form}
          placeholder="객실명을 입력해 주세요. (ex. 디럭스 더블 룸)"
        />
        <PriceContainer header="객실 가격" />
        <ImageUploadContainer header="객실 사진" />
        <div>
          <h1>객실수</h1>
          <div>내용</div>
        </div>
        <div>
          <h1>시간</h1>
          <div>내용</div>
        </div>
        <div>
          <h1>인원</h1>
          <div>내용</div>
        </div>
        <CheckBoxContainer options={roomOptions} header="객실 옵션" />
        <ButtonContainer buttonStyle={'navigate'} isValid={isValid} />
      </Form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: ${colors.white};

  padding: 40px;

  border-radius: 8px;
`;
