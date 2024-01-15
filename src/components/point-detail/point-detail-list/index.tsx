import { Button, Layout } from 'antd';
import styled from 'styled-components';
import { OrderStatusBadge } from '../badge';
import { TextBox } from '@components/text-box';
import { colors } from '@/constants/colors';
import { useRecoilValue } from 'recoil';
import { pointDetailDataState } from '@stores/point-detail/atoms';
import { ReceiptModal } from '../payment/receipt';
import { useState } from 'react';
import { numberFormat } from '@/utils/Format/numberFormat';
import { CancelModal } from '../payment/cancel';

export const PointDetailList = () => {
  const pointDetailData = useRecoilValue(pointDetailDataState);

  const [isReceiptModalOpenList, setIsReceiptModalOpenList] = useState(
    Array(pointDetailData.histories.length).fill(false),
  );
  const [isCancelModalOpenList, setIsCancelModalOpenList] = useState(
    Array(pointDetailData.histories.length).fill(false),
  );

  const showReceiptModal = (index: number) => {
    setIsReceiptModalOpenList((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const showCancelModal = (index: number) => {
    setIsCancelModalOpenList((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

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
                {histories.type === '쿠폰'
                  ? `${numberFormat(histories.trade)}매`
                  : `${numberFormat(histories.trade)}원`}
              </TextBox>
            </StyledListItem>
            <StyledListItem>
              <TextBox
                typography="body1"
                color={
                  histories.status === '취소 완료' ? 'black500' : 'primary'
                }
                fontWeight="700"
              >
                {histories.category === '사용' ? '-' : '+'}{' '}
                {numberFormat(histories.trade)} P
              </TextBox>
            </StyledListItem>
            <StyledListItem>
              <div>
                <StyledButton
                  isCancel={false}
                  onClick={() => showReceiptModal(index)}
                >
                  영수증 조회
                </StyledButton>

                <ReceiptModal
                  isModalOpen={isReceiptModalOpenList[index]}
                  setIsModalOpen={() => showReceiptModal(index)}
                  index={index}
                ></ReceiptModal>
              </div>
              <div>
                <StyledButton
                  isCancel={true}
                  disabled={histories.status === '결제 완료' ? false : true}
                  onClick={() => showCancelModal(index)}
                >
                  결제 취소
                </StyledButton>
                <CancelModal
                  isModalOpen={isCancelModalOpenList[index]}
                  setIsModalOpen={() => showCancelModal(index)}
                  index={index}
                ></CancelModal>
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
