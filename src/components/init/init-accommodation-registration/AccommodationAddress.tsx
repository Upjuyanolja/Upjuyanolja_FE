import { styled } from 'styled-components';
import { Input, Button, Form } from 'antd';
import { useState } from 'react';
import { AddressHandleInputChangeProps } from './type';
import { AddressFormatProps } from '@components/init/init-accommodation-registration/type';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { ADDRESS_TYPE_ROAD } from '@/constants/init/init-accommodation-registration';

export const AccommodationAddress = () => {
  const [inputPostCode, setInputPostCode] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [inputDetailAddress, setInputDetailAddress] = useState('');

  const handleInputChange = ({
    event,
    inputType,
  }: AddressHandleInputChangeProps) => {
    const inputValue = event.target.value;

    switch (inputType) {
      case 'accommodationDetailAddress':
        setInputDetailAddress(inputValue);
        break;
      default:
        break;
    }
  };

  const openAddressPopup = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js',
  );

  const addressFormat = (data: AddressFormatProps) => {
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
  };

  const openAddressAPI = () => {
    openAddressPopup({ onComplete: addressFormat });
  };

  return (
    <StyledInputWrapper>
      <Form.Item
        rules={[{ required: true }]}
        label="숙소 위치"
        colon={false}
        htmlFor="accommodationDetailAddress"
      >
        <StyledAddressWrapper>
          <StyledInput
            id="accommodationPost"
            placeholder="우편번호"
            value={inputPostCode}
            data-testid="accommodation-post"
            readOnly={true}
            style={{ cursor: 'default' }}
            disabled={true}
          />
          <StyledAddressButton
            type="primary"
            data-testid="acccommodation-address-api-button"
            onClick={openAddressAPI}
          >
            주소 검색
          </StyledAddressButton>
        </StyledAddressWrapper>
        <StyledInput
          id="accommodationAddress"
          placeholder="주소"
          value={inputAddress}
          data-testid="accommodation-address"
          readOnly={true}
          style={{ cursor: 'default' }}
          disabled={true}
        />
        <StyledInput
          id="accommodationDetailAddress"
          placeholder="상세주소"
          value={inputDetailAddress}
          onChange={(event) =>
            handleInputChange({
              event,
              inputType: 'accommodationDetailAddress',
            })
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
