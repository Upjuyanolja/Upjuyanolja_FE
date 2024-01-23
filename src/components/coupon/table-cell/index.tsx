import { TextBox } from '@components/text-box';
import { Input, Tooltip } from 'antd';
import styled from 'styled-components';
import {
  couponNameContainerProps,
  dayLimitInputProps,
  roomContainerProps,
} from './type';
import { InfoCircleOutlined } from '@ant-design/icons';

export const RoomContainer = ({ room }: roomContainerProps) => {
  return (
    <StyledRoomContainer>
      <TextBox fontWeight={700} typography="body2">
        {room.name}
      </TextBox>
      <TextBox fontWeight={400} typography="body4">
        {room.price.toLocaleString()}원
      </TextBox>
    </StyledRoomContainer>
  );
};
const StyledRoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CouponNameContainer = ({
  info,
  isSoldOut,
}: couponNameContainerProps) => {
  return (
    <StyledCouponNameContainer>
      <TextBox
        fontWeight={700}
        typography="body2"
        color={isSoldOut ? 'black600' : 'black900'}
      >
        {info.name}
      </TextBox>
      <TextBox color="black600" typography="body4" fontWeight={400}>
        (적용가 {info.appliedPrice.toLocaleString()}원)
      </TextBox>
    </StyledCouponNameContainer>
  );
};
const StyledCouponNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 232px;
`;

export const DayLimitInput = ({
  isSoldOut,
  handleChangeDayLimit,
  record,
}: dayLimitInputProps) => {
  return (
    <>
      <StyledInput
        value={record.dayLimit === -1 ? '' : record.dayLimit}
        disabled={isSoldOut}
        onChange={(event) => {
          handleChangeDayLimit(event, record.key);
        }}
        data-testid="day-limit-input"
      />
      <TextBox
        typography="body2"
        fontWeight={400}
        color={isSoldOut ? 'black600' : 'black900'}
      >
        장
      </TextBox>
    </>
  );
};
const StyledInput = styled(Input)`
  width: 56px;
  margin-right: 4px;
`;

export const DayLimitTitle = () => {
  return (
    <StyledDayLimitTitle>
      {' '}
      <TextBox typography="body2" fontWeight={700}>
        일일 제한 수량
      </TextBox>
      <Tooltip
        title={
          <>
            일일 체크인에 사용 가능한 쿠폰의 수량을 제한하여
            <br />
            효율적으로 객실을 운영할 수 있습니다
            <br />
            공백을 입력하면 발급 수량 제한이 없습니다.
          </>
        }
        overlayInnerStyle={{
          width: '300px',
          textAlign: 'center',
        }}
      >
        <InfoCircleOutlined width="18px" height="18px" color="blue" />
      </Tooltip>
    </StyledDayLimitTitle>
  );
};

const StyledDayLimitTitle = styled.div`
  display: flex;
  gap: 4px;
`;
