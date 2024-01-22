import { useState } from 'react';
import { TimePicker, Form } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { TimeContainerProps } from './type';
import locale from 'antd/es/date-picker/locale/de_DE';
import moment, { Moment } from 'moment';

export const TimeContainer = ({
  header,
  form,
  defaultCheckInTime,
  defaultCheckOutTime,
}: TimeContainerProps) => {
  const format = 'HH:mm';
  const specificTime = moment().hours(9).minutes(0);
  const [checkInTime, setCheckInTime] = useState<Moment>(specificTime);
  const [checkOutTime, setCheckOutTime] = useState<Moment>(specificTime);

  const handleCheckInChange = (time: Moment | null) => {
    if (!time) {
      form.setFieldValue('checkInTime', '09:00');
      const defaultTime = moment().hours(9).minutes(0);
      setCheckInTime(defaultTime);
    } else {
      form.setFieldValue('checkInTime', time);
      setCheckInTime(time);
    }
  };

  const handleCheckOutChange = (time: Moment | null) => {
    if (!time) {
      form.setFieldValue('checkOutTime', '00:00');
      const defaultTime = moment().hours(9).minutes(0);
      setCheckOutTime(defaultTime);
    } else {
      form.setFieldValue('checkOutTime', time);
      setCheckOutTime(time);
    }
  };

  return (
    <StyledInputWrapper>
      <StyledHeadTextContainer>
        <TextBox typography="h4" fontWeight={700}>
          {header}
        </TextBox>
      </StyledHeadTextContainer>
      <StyledRow>
        <StyledTextBoxWrapper>
          <TextBox typography="body1" color="black900" fontWeight="normal">
            체크인
          </TextBox>
        </StyledTextBoxWrapper>
        <Form.Item
          name={'checkInTime'}
          initialValue={
            defaultCheckInTime ? moment(defaultCheckInTime, 'HH:mm') : ''
          }
        >
          <StyledTimePicker
            placeholder="00:00"
            format={format}
            minuteStep={30}
            value={checkInTime}
            onChange={handleCheckInChange}
            popupStyle={{ height: 274 }}
            showNow={false}
            inputReadOnly={true}
            locale={{
              ...locale,
              lang: {
                ...locale.lang,
                ok: '확인',
              },
            }}
          />
        </Form.Item>
      </StyledRow>
      <StyledRow>
        <StyledTextBoxWrapper>
          <TextBox typography="body1" color="black900" fontWeight="normal">
            체크아웃
          </TextBox>
        </StyledTextBoxWrapper>
        <Form.Item
          name={'checkOutTime'}
          initialValue={
            defaultCheckOutTime ? moment(defaultCheckOutTime, 'HH:mm') : ''
          }
        >
          <StyledTimePicker
            placeholder="00:00"
            format={format}
            minuteStep={30}
            value={checkOutTime}
            onChange={handleCheckOutChange}
            popupStyle={{ height: 274 }}
            showNow={false}
            inputReadOnly={true}
            locale={{
              ...locale,
              lang: {
                ...locale.lang,
                ok: '확인',
              },
            }}
          />
        </Form.Item>
      </StyledRow>
    </StyledInputWrapper>
  );
};

const StyledHeadTextContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledTextBoxWrapper = styled.div`
  width: 63px;
  &:last-child {
    margin-right: 0;
  }
`;

const StyledRow = styled.div`
  height: 40px;
  width: 203px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
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

  .ant-form-item-col {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .ant-form-item-control {
    width: 100%;
  }

  .ant-input {
    font-size: 16px;
  }
`;

const StyledTimePicker = styled(TimePicker)`
  display: flex;
  width: 128px;
  padding: 8px 12px;
  align-items: center;
  margin-top: 25px;

  .ant-picker-clear {
    display: none !important;
  }

  .ant-picker-suffix {
    pointer-events: none;
  }

  .ant-picker-time-panel-column {
    li.ant-picker-time-panel-cell-disabled {
      background-color: red;
    }
  }
`;
