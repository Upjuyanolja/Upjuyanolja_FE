import { Button, Space } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { colors } from '@/constants/colors';
import { useEffect, useState } from 'react';
import { UserProfileProps } from './type';
import { numberFormat } from '@/utils/formatiing/numberFormat';
import { PointModal } from '@components/point-charge-modal/point-modal';

export const UserProfile = ({ pointTotalData }: UserProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const memberData = JSON.parse(localStorage.getItem('member') || '{}');
  const memberName = memberData?.name;

  return (
    <StyledSpace direction="vertical" align="center">
      <TextBox typography="h5" color="primary" fontWeight="bold">
        {memberName} 님
      </TextBox>
      <TextBox typography="body1" color="black900" fontWeight="bold">
        {numberFormat(Number(pointTotalData?.totalPoint))} P
      </TextBox>
      <StyledButton
        type="primary"
        size="large"
        onClick={showModal}
        data-testid="charge-point-button"
      >
        <TextBox typography="h5" fontWeight={700}>
          포인트 충전하기
        </TextBox>
      </StyledButton>
      {isModalOpen && (
        <PointModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </StyledSpace>
  );
};

const StyledSpace = styled(Space)`
  display: flex;
  gap: 4px;
  padding: 24px 30px;
  border-bottom: 1px solid ${colors.black500};
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  width: 196px;
  margin-top: 8px;
`;
