import { Button, Layout } from 'antd';
import styled from 'styled-components';
import { OrderStatusBadge } from '../badge';
import { TextBox } from '@components/atom/text-box';
import { colors } from '@/constants/colors';
import { useRecoilValue } from 'recoil';
import { pointDetailDataState } from '@stores/point-detail/atoms';
import { ReceiptModal } from '../payment/receipt';
import { useState } from 'react';
import { numberFormat } from '@/utils/formatiing/numberFormat';
import { CancelModal } from '../payment/cancel';
import { formatDate } from '@/utils/formatiing/dateFormat';

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
      {pointDetailData.histories.length > 0 &&
        pointDetailData.histories.map((histories, index) => (
          <StyledList key={index}>
            <StyledListItem>
              <div>
                <TextBox typography="body3" color="black900" fontWeight="400">
                  {formatDate(histories.receipt.tradeAt.split('T')[0]).format2}
                </TextBox>
              </div>
              <OrderStatusBadge status={histories.status} />
            </StyledListItem>
            <StyledListItem flexSize={4}>
              <div>
                <TextBox typography="body3" color="black900" fontWeight="700">
                  {histories.type === '쿠폰' ? '할인 쿠폰 구매' : '포인트 충전'}
                </TextBox>
              </div>
              {histories.type === '쿠폰' && (
                <div>
                  <span>
                    <TextBox
                      typography="body3"
                      color="black900"
                      fontWeight="700"
                      className="circle-marker"
                    >
                      {pointDetailData.histories[index].description.split(
                        ' | ',
                      )[0] + ' | '}
                    </TextBox>
                    <TextBox
                      typography="body3"
                      color="black900"
                      fontWeight="400"
                    >
                      {
                        pointDetailData.histories[index].description.split(
                          ' | ',
                        )[1]
                      }
                    </TextBox>
                  </span>
                </div>
              )}
            </StyledListItem>
            <StyledListItem>
              <TextBox typography="body2" color="black900" fontWeight="400">
                {histories.type === '쿠폰'
                  ? `${numberFormat(histories.trade)}장`
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
                {numberFormat(histories.amount)} P
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
                />
              </div>
              <div>
                <StyledButton
                  isCancel={true}
                  disabled={
                    histories.status === '결제 완료' &&
                    histories.receipt.method === '카드'
                      ? false
                      : true
                  }
                  onClick={() => showCancelModal(index)}
                >
                  결제 취소
                </StyledButton>
                <CancelModal
                  isModalOpen={isCancelModalOpenList[index]}
                  setIsModalOpen={() => showCancelModal(index)}
                  index={index}
                />
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
  .circle-marker::before {
    content: '●';
    font-size: 8px;
    vertical-align: middle;
    margin: 0px 8px;
  }
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
