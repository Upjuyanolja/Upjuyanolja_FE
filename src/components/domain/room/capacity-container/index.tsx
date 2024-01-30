import { useState, useEffect } from 'react';
import { InputNumber, Col, Form } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/atom/text-box';
import { FormErrorMessage } from '@components/domain/init/FormErrorMessage';
import { ValidateInputProps, CapacityContainerProps } from './type';
import {
  MAX_CAPACITY,
  MIN_CAPACITY,
} from '@/constants/room/room-registration/';
import { capacityHasError } from '@stores/room/atoms';
import { useRecoilState } from 'recoil';

export const CapacityContainer = ({ header, form }: CapacityContainerProps) => {
  const [defaultCapacity, setDefaultCapacity] = useState<number>(1);
  const [maxCapacity, setMaxCapacity] = useState<number>(1);
  const [error, setError] = useRecoilState(capacityHasError);

  useEffect(() => {
    setError(null);
    if (defaultCapacity > maxCapacity) {
      setError('최대 인원은 기준 인원보다 작을 수 없습니다.');
    }
  }, [defaultCapacity, maxCapacity]);
  const validateInput = ({ value }: ValidateInputProps) => {
    setError(null);
    if (value < MIN_CAPACITY || value > MAX_CAPACITY) {
      setError('1~15까지만 입력 가능합니다.');
    }
  };

  const handleCapacityChange =
    (capType: string) => (newValue: number | string | null | undefined) => {
      if (typeof newValue !== 'number') return;
      validateInput({ value: newValue });
      if (capType === 'default') {
        setDefaultCapacity(newValue);
        form.setFieldValue('defaultCapacity', newValue);
      } else {
        setMaxCapacity(newValue);
        form.setFieldValue('maxCapacity', newValue);
      }
    };

  return (
    <StyledInputWrapper>
      <StyledHeadTextContainer>
        <StyledDesc>
          <TextBox typography="h4" fontWeight={700}>
            {header}
          </TextBox>
          <TextBox color="black600" typography="body3">
            1~15까지만 가능합니다.
          </TextBox>
        </StyledDesc>
      </StyledHeadTextContainer>
      <StyledCol>
        <StyledRow>
          <StyledTextBoxWrapper>
            <TextBox typography="body1" color="black900" fontWeight="normal">
              기준 인원
            </TextBox>
          </StyledTextBoxWrapper>
          <Form.Item name={'defaultCapacity'} initialValue={1}>
            <StyledInputNumber
              min={1}
              max={15}
              value={defaultCapacity}
              onChange={handleCapacityChange('default')}
              data-testid="default-capacity"
            />
          </Form.Item>
          <StyledTextBoxWrapper>
            <TextBox typography="body1" color="black900" fontWeight="normal">
              명
            </TextBox>
          </StyledTextBoxWrapper>
        </StyledRow>
        <StyledRow>
          <StyledTextBoxWrapper>
            <TextBox typography="body1" color="black900" fontWeight="normal">
              최대 인원
            </TextBox>
          </StyledTextBoxWrapper>
          <Form.Item name={'maxCapacity'} initialValue={1}>
            <StyledInputNumber
              min={1}
              max={15}
              value={maxCapacity}
              onChange={handleCapacityChange('maximum')}
              data-testid="max-capacity"
            />
          </Form.Item>
          <StyledTextBoxWrapper>
            <TextBox typography="body1" color="black900" fontWeight="normal">
              명
            </TextBox>
          </StyledTextBoxWrapper>
        </StyledRow>
        {error && (
          <StyledErrorMessageWrapper data-testid="error-input-capacity">
            <StyledFormErrorMessage errorMessage={error} />
          </StyledErrorMessageWrapper>
        )}
      </StyledCol>
    </StyledInputWrapper>
  );
};

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledHeadTextContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
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

const StyledInputNumber = styled(InputNumber)`
  display: flex;
  width: 90px;
  height: 40px;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  margin-right: 4px;
  margin-top: 20px;

  .ant-input-number-input {
    width: 100%;
    text-align: right;
    padding-right: 34px;
  }

  .ant-input-number-handler-wrap {
    opacity: 1;
  }
`;

const StyledTextBoxWrapper = styled.div`
  margin-right: 12px;
  &:last-child {
    margin-right: 0;
  }
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8;
  height: 40px !important;
`;

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

const StyledDesc = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
