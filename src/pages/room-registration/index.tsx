import { Input, Button, Form, Select, Checkbox, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { colors } from '@/constants/colors';

const RoomRegistration = () => {
  return (
    <StyledPageContainer>
      <StyledForm layout="vertical">
        <FormTitle>객실 추가 등록</FormTitle>
        <FormItem label="객실명" name="roomName" rules={[{ required: true }]}>
          <Input placeholder="객실명을 입력하세요. (ex. 디럭스 더블 룸)" />
        </FormItem>
        <FormItem
          label="객실 가격"
          name="roomPrice"
          rules={[{ required: true }]}
        >
          <Input addonAfter="원" type="number" />
        </FormItem>
        <FormItem label="수소 대표 이미지 설정">
          <RoomImageUpload
            listType="picture-card"
            beforeUpload={() => false} // Implement file handling logic
          >
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </RoomImageUpload>
        </FormItem>
        <FormItem label="객실 수" name="roomQuantity">
          <Input type="number" min={0} addonAfter="개" />
        </FormItem>
        <FormItem label="시간">
          <Select style={{ width: 100 }}>
            <Option value="00">00시</Option>
            {/* Add more options here */}
          </Select>
          <Select style={{ width: 100 }}>
            <Option value="00">00분</Option>
            {/* Add more options here */}
          </Select>
        </FormItem>
        <FormItem label="인원">
          <Input type="number" min={0} addonAfter="명" />
        </FormItem>
        <FormItem label="객실 옵션">
          <RoomCheckboxGroup options={['TV', '에어컨', '인터넷']} />
        </FormItem>
        <FormItem>
          <SubmitButton type="primary">등록 완료</SubmitButton>
        </FormItem>
      </StyledForm>
    </StyledPageContainer>
  );
};

export default RoomRegistration;

const { Option } = Select;

const StyledPageContainer = styled.div`
  padding: 24px;
  background: ${colors.midGray};
`;

const StyledForm = styled(Form)`
  max-width: 700px;
  margin: auto;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  text-align: left;
  margin-bottom: 24px;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 16px;
`;

const SubmitButton = styled(Button)`
  width: 100%;
`;

const RoomImageUpload = styled(Upload)`
  .ant-upload {
    width: 128px;
    height: 128px;
    img {
      width: 100%;
    }
  }
`;

const RoomCheckboxGroup = styled(Checkbox.Group)`
  width: 100%;
`;
