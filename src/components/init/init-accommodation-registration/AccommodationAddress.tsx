import { styled } from 'styled-components';
import { Input, Button, Form } from 'antd';
import { ChangeEvent, useState } from 'react';
import { formType } from './type';
import { AddressFormat } from '@components/init/init-accommodation-registration/type';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { ADDRESS_TYPE_ROAD } from '@/constants/init/init-accommodation-registration';
import { TextBox } from '@components/text-box';

export const AccommodationAddress = ({ form }: formType) => {
  const [inputPostCode, setInputPostCode] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputDetailAddress, setInputDetailAddress] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputDetailAddress(inputValue);
  };

  const openAddressPopup = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  );

  const addressFormat = (data: AddressFormat) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === ADDRESS_TYPE_ROAD) {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setInputPostCode(data.zonecode);
    setInputAddress(fullAddress);

    form.setFieldsValue({
      'accommodation-postCode': data.zonecode,
      'accommodation-address': fullAddress,
    });
  };

  const openAddressAPI = () => {
    openAddressPopup({ onComplete: addressFormat });
  };

  return (
    <StyledInputWrapper>
      <TextBox typography="h4" fontWeight={700}>
        숙소 위치
      </TextBox>
      <StyledAddressWrapper>
        <Form.Item name="accommodation-postCode">
          <StyledInput
            id="accommodation-postCode"
            placeholder="우편번호"
            value={inputPostCode}
            data-testid="accommodation-post"
            readOnly={true}
            style={{ cursor: 'default' }}
            disabled={true}
          />
        </Form.Item>
        <StyledAddressButton
          type="primary"
          data-testid="acccommodation-address-api-button"
          onClick={openAddressAPI}
        >
          주소 검색
        </StyledAddressButton>
      </StyledAddressWrapper>
      <Form.Item name="accommodation-address">
        <StyledInput
          id="accommodation-address"
          placeholder="주소"
          value={inputAddress}
          data-testid="accommodation-address"
          readOnly={true}
          style={{ cursor: 'default' }}
          disabled={true}
        />
      </Form.Item>
      <Form.Item name="accommodation-detailAddress">
        <StyledInput
          id="accommodation-detailAddress"
          placeholder="상세주소"
          value={inputDetailAddress}
          onChange={handleInputChange}
        />
      </Form.Item>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  .ant-form-item {
    margin-bottom: 0;
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
