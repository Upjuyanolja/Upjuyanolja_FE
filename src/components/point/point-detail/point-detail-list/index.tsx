import { Button, Layout } from 'antd';
import styled from 'styled-components';
import { OrderStatusBadge } from '../badge';
import { TextBox } from '@components/text-box';
import { colors } from '@/constants/colors';

export const PointDetailList = () => {
  return (
    <StyledLayout>
      <StyledList>
        <StyledListItem>
          <div>
            <TextBox typography="body3" color="black900" fontWeight="400">
              23.12.20.
            </TextBox>
          </div>
          <OrderStatusBadge status={'구매 확정'} />
        </StyledListItem>
        <StyledListItem flexSize={4}>
          <div>
            <TextBox typography="body3" color="black900" fontWeight="700">
              5% 할인쿠폰
            </TextBox>
          </div>
          <div>
            <TextBox typography="body3" color="black900" fontWeight="400">
              • 패캠스테이 삼성점 | 스탠다드, 스탠다드 더불, 프리미엄
            </TextBox>
          </div>
        </StyledListItem>
        <StyledListItem>
          <TextBox typography="body2" color="black900" fontWeight="400">
            100매
          </TextBox>
        </StyledListItem>
        <StyledListItem>
          <TextBox typography="body1" color="primary" fontWeight="700">
            - 5,000 P
          </TextBox>
        </StyledListItem>
        <StyledListItem>
          <div>
            <StyledButton isCancel={false}>영수증 조회</StyledButton>
          </div>
          <div>
            <StyledButton isCancel={true} disabled>
              결제 취소
            </StyledButton>
          </div>
        </StyledListItem>
      </StyledList>
      <StyledList>
        <StyledListItem>
          <div>
            <TextBox typography="body3" color="black900" fontWeight="400">
              23.12.20.
            </TextBox>
          </div>
          <OrderStatusBadge status={'결제 완료'} />
        </StyledListItem>
        <StyledListItem flexSize={4}>
          <div>
            <TextBox typography="body3" color="black900" fontWeight="700">
              포인트 충전
            </TextBox>
          </div>
        </StyledListItem>
        <StyledListItem>
          <TextBox typography="body2" color="black900" fontWeight="400">
            5,000원
          </TextBox>
        </StyledListItem>
        <StyledListItem>
          <TextBox typography="body1" color="primary" fontWeight="700">
            + 5,000 P
          </TextBox>
        </StyledListItem>
        <StyledListItem>
          <div>
            <StyledButton isCancel={false}>영수증 조회</StyledButton>
          </div>
          <div>
            <StyledButton isCancel={true}>결제 취소</StyledButton>
          </div>
        </StyledListItem>
      </StyledList>
      <StyledList>
        <StyledListItem>
          <div>
            <TextBox typography="body3" color="black900" fontWeight="400">
              23.12.20.
            </TextBox>
          </div>
          <OrderStatusBadge status={'취소 완료'} />
        </StyledListItem>
        <StyledListItem>
          <div>
            <TextBox typography="body3" color="black900" fontWeight="700">
              포인트 충전
            </TextBox>
          </div>
        </StyledListItem>
        <StyledListItem>
          <TextBox typography="body2" color="black900" fontWeight="400">
            5,000원
          </TextBox>
        </StyledListItem>
        <StyledListItem>
          <TextBox typography="body1" color="black500" fontWeight="700">
            + 5,000 P
          </TextBox>
        </StyledListItem>
        <StyledListItem>
          <div>
            <StyledButton isCancel={false}>영수증 조회</StyledButton>
          </div>
          <div>
            <StyledButton isCancel={true} disabled>
              결제 취소
            </StyledButton>
          </div>
        </StyledListItem>
      </StyledList>
    </StyledLayout>
  );
};
const StyledLayout = styled(Layout)`
  height: 408px;
`;
const StyledList = styled('div')`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 0px;

  border-bottom: 2px dashed ${colors.black600};
`;
const StyledListItem = styled('div')<{ flexSize?: number }>`
  min-width: 112px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:nth-of-type(2) {
    width: 480px;
    padding-left: 8px;
    align-items: baseline;
  }
  &:last-of-type {
    gap: 8px;
  }
`;
const StyledButton = styled(Button)<{ isCancel: boolean }>`
  width: 80px;

  border-color: ${(props) =>
    props.isCancel ? colors.black700 : colors.primary};
  border-radius: 2px;

  padding: 4px 9px;

  background-color: ${(props) =>
    props.isCancel ? colors.midGray : colors.light};
  color: ${(props) => (props.isCancel ? colors.black700 : colors.primary)};

  &:disabled {
    color: ${colors.black500};
  }
`;
