import { styled } from 'styled-components';
import { Input, Form } from 'antd';
import { FormErrorMessage } from '@components/init/FormErrorMessage';
import { PriceContainerProps, PriceHandleInputChangeProps } from './type';
import { MAX_PRICE, MIN_PRICE } from '@/constants/room/room-registration';
import { TextBox } from '@components/text-box';
import { useRecoilState } from 'recoil';
import { priceHasError } from '@stores/room/atoms';
import { useEffect, useState } from 'react';

export const PriceContainer = ({ header, form }: PriceContainerProps) => {
  const [outOfRangeError, setOutOfRangeError] = useRecoilState(priceHasError);
  const [numericValue, setNumericValue] = useState<number | null>(null);

  useEffect(() => {
    setOutOfRangeError(null);
    form.setFieldValue('price', numericValue?.toLocaleString());

    if (!numericValue) return;
    if (numericValue < MIN_PRICE || numericValue > MAX_PRICE) {
      setOutOfRangeError('10,000~1,000,000까지만 입력 가능합니다.');
    }
  }, [numericValue]);

  const handleInputChange = ({ event }: PriceHandleInputChangeProps) => {
    const stringValue = event.target.value;
    const cleanedStringValue = stringValue.replace(/[^0-9]/g, '');

    if (cleanedStringValue.length !== 0) {
      setNumericValue(Number(cleanedStringValue));
    } else {
      form.setFieldValue('price', '');
    }
  };

  return (
    <StyledInputWrapper>
      <StyledDesc>
        <TextBox typography="h4" fontWeight={700}>
          {header}
        </TextBox>
      </StyledDesc>
      <StyledRow>
        <StyledTextBoxWrapper>
          <TextBox typography="body1" color="black900" fontWeight="normal">
            1박 당
          </TextBox>
        </StyledTextBoxWrapper>
        <Form.Item name="price">
          <StyledInput
            id="price"
            type="text"
            style={{
              height: 40,
              width: header === '' ? '440px' : '',
            }}
            onChange={(event) => handleInputChange({ event })}
            status={outOfRangeError ? 'error' : ''}
            data-testid="input-room-price"
          />
        </Form.Item>
        {outOfRangeError && (
          <StyledErrorMessageWrapper data-testid="error-input-price">
            <StyledFormErrorMessage errorMessage={outOfRangeError} />
          </StyledErrorMessageWrapper>
        )}
        <StyledTextBoxWrapper>
          <TextBox typography="body1" color="black900" fontWeight="normal">
            원
          </TextBox>
        </StyledTextBoxWrapper>
      </StyledRow>
    </StyledInputWrapper>
  );
};

const StyledInputWrapper = styled.div`
  margin-bottom: 48px;
  position: relative;

  .ant-form-item-header {
    header {
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

  .ant-input {
    font-size: 16px;
  }
`;

const StyledErrorMessageWrapper = styled.div`
  height: 18px;
  width: 100%;
  position: absolute;
  bottom: -24px;
  left: 0;
`;

const StyledFormErrorMessage = styled(FormErrorMessage)`
  float: left;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const StyledTextBoxWrapper = styled.div`
  margin-right: 12px;

  &:last-child {
    margin-right: 0;
  }
`;

const StyledInput = styled(Input)`
  height: 40px;
  width: 160px;
  font-size: 16px;
  margin-right: 4px;
  margin-top: 20px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StyledRow = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 8;
`;

const StyledDesc = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;
