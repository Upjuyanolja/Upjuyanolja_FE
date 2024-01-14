import { pageNumState, pointDetailDataState } from '@stores/point-detail/atoms';
import { Pagination, Space } from 'antd';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import styled from 'styled-components';

export const PageComp = () => {
  const setPageNum = useSetRecoilState(pageNumState);
  const pointDetailData = useRecoilValue(pointDetailDataState);

  const handlePageChange = (pageNum: number) => {
    setPageNum(pageNum);
  };

  return (
    <StyledSpace>
      <StyledPagination
        defaultCurrent={1}
        total={pointDetailData.totalPages * 10}
        hideOnSinglePage={true}
        onChange={(page) => handlePageChange(page)}
      />
    </StyledSpace>
  );
};

const StyledSpace = styled(Space)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 16px;
`;

const StyledPagination = styled(Pagination)`
  .ant-pagination-options {
    display: none;
  }
`;
