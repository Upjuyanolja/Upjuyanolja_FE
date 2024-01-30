import { colors } from '@/constants/colors';

import styled from 'styled-components';
import { TextBox } from '@components/atom/text-box';

export const CompanyInfo = () => {
  return (
    <CompanyBox>
      <TextBox typography="body2" color={'black900'} fontWeight={'700'}>
        회사명 : 빨리잡아
      </TextBox>
    </CompanyBox>
  );
};
const CompanyBox = styled('div')`
  width: 100%;
  display: flex;
  justify-content: end;

  padding: 8px;
  margin-bottom: 24px;

  border-radius: 8px;

  background-color: ${colors.midGray};
`;
