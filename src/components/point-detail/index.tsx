import { PointMenu } from './point-detail-menu';
import { PointDetailList } from './point-detail-list';
import { PageComp } from './page';
import { pointDetailDataState } from '@stores/point-detail/atoms';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';

export const PointDetailComp = () => {
  const pointDetailData = useRecoilValue(pointDetailDataState);

  return (
    <>
      <PointMenu />
      {pointDetailData ? (
        <>
          <PointDetailList />
          <PageComp />
        </>
      ) : (
        <StyledNotItemDiv>
          <TextBox typography="body1" color="black700" fontWeight="400">
            이 달의 결제 내역이 없습니다.
          </TextBox>
        </StyledNotItemDiv>
      )}
    </>
  );
};

const StyledNotItemDiv = styled('div')`
  width: 928px;
  height: 344px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
