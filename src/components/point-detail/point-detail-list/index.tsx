import { Button, Layout } from 'antd';
import styled from 'styled-components';
import { OrderStatusBadge } from '../badge';
import { TextBox } from '@components/text-box';
import { colors } from '@/constants/colors';
import { useRecoilState } from 'recoil';
import { pointDetailDataState } from '@stores/point-detail/atoms';

export const PointDetailList = () => {
  const [pointDetailData] = useRecoilState(pointDetailDataState);

  return (
    <StyledLayout>
      {pointDetailData.histories &&
        pointDetailData.histories.map((histories, index) => (
          <StyledList key={index}>
            <StyledListItem>
              <div>
                <TextBox typography="body3" color="black900" fontWeight="400">
                  {histories.receipt.tradeAt.split(' ')[0]}
                </TextBox>
              </div>
              <OrderStatusBadge status={histories.status} />
            </StyledListItem>
            <StyledListItem flexSize={4}>
              <div>
                <TextBox typography="body3" color="black900" fontWeight="700">
                  {histories.name}
                </TextBox>
              </div>
              <div>
                <TextBox typography="body3" color="black900" fontWeight="400">
                  {histories.description}
                </TextBox>
              </div>
            </StyledListItem>
            <StyledListItem>
              <TextBox typography="body2" color="black900" fontWeight="400">
                {histories.trade}
              </TextBox>
            </StyledListItem>
            <StyledListItem>
              <TextBox typography="body1" color="primary" fontWeight="700">
                {histories.category === '사용' ? '-' : '+'} {histories.trade} P
              </TextBox>
            </StyledListItem>
            <StyledListItem>
              <div>
                <StyledButton isCancel={false}>영수증 조회</StyledButton>
              </div>
              <div>
                <StyledButton
                  isCancel={true}
                  disabled={histories.status === '결제 완료' ? false : true}
                >
                  결제 취소
                </StyledButton>
              </div>
            </StyledListItem>
          </StyledList>
        ))}
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

  border-bottom: 1.5px dashed ${colors.black600};
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
