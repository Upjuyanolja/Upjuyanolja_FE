import { TimePicker } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { TimeContainerProps } from './type';
import locale from 'antd/es/date-picker/locale/de_DE';

export const TimeContainer = ({ header }: TimeContainerProps) => {
  const format = 'HH:mm';

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
        <StyledTimePicker
          placeholder="00:00"
          format={format}
          minuteStep={30}
          popupStyle={{ height: 274 }}
          showNow={false}
          locale={{
            ...locale,
            lang: {
              ...locale.lang,
              ok: '확인',
            },
          }}
        />
      </StyledRow>
      <StyledRow>
        <StyledTextBoxWrapper>
          <TextBox typography="body1" color="black900" fontWeight="normal">
            체크아웃
          </TextBox>
        </StyledTextBoxWrapper>
        <StyledTimePicker
          placeholder="00:00"
          format={format}
          minuteStep={30}
          popupStyle={{ height: 274 }}
          showNow={false}
          locale={{
            ...locale,
            lang: {
              ...locale.lang,
              ok: '확인',
            },
          }}
        />
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
`;
