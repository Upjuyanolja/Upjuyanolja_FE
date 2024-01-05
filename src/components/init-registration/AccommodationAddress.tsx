import { styled } from 'styled-components';
import { Input, Button, Form } from 'antd';
import { useState, ChangeEvent } from 'react';

export const AccommodationAddress = () => {
  const [inputPost, setInputPost] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputDetailAddress, setInputDetailAddress] = useState('');

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    inputType: string,
  ) => {
    const inputValue = event.target.value;

    switch (inputType) {
      case 'accommodationPost':
        setInputPost(inputValue);
        break;
      case 'accommodationAddress':
        setInputAddress(inputValue);
        break;
      case 'accommodationDetailAddress':
        setInputDetailAddress(inputValue);
        break;
      default:
        break;
    }
  };

  return (
    <StyledInputWrapper>
      <Form.Item rules={[{ required: true }]} label="숙소 위치" colon={false}>
        <StyledAddressWrapper>
          <StyledInput
            id="accommodationPost"
            placeholder="우편번호"
            value={inputPost}
            onChange={(event) => handleInputChange(event, 'accommodationPost')}
          />
          <StyledAddressButton type="primary">주소 검색</StyledAddressButton>
        </StyledAddressWrapper>
        <StyledInput
          id="accommodationAddress"
          placeholder="주소"
          value={inputAddress}
          onChange={(event) => handleInputChange(event, 'accommodationAddress')}
        />

        <StyledInput
          id="accommodationDetailAddress"
          placeholder="상세주소"
          value={inputDetailAddress}
          onChange={(event) =>
            handleInputChange(event, 'accommodationDetailAddress')
          }
        />
      </Form.Item>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;

  .ant-form-item-label {
    label {
      font-size: 24px;
      font-weight: 700;
      line-height: 36px;
    }
  }

  .ant-form-item-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .ant-form-item-control {
    width: 100%;
  }

  .ant-form-item-control-input-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ant-input {
    font-size: 16px;
  }
`;

const StyledInput = styled(Input)`
  height: 40px;
`;

const StyledAddressWrapper = styled.div`
  display: grid;
  grid-template-columns: 7fr 1fr;
  gap: 5px;
`;

const StyledAddressButton = styled(Button)`
  height: 40px;
  font-size: 18px;
`;
