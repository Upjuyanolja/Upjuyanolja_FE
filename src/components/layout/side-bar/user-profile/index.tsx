import { Button, Space } from 'antd';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { colors } from '@/constants/colors';
import { useState } from 'react';
import { UserProfileProps } from './type';
import { numberFormat } from '@/utils/Format/numberFormat';
import { PointModal } from '@components/point-charge-modal/point-modal';

export const UserProfile = ({
  userInfoData,
  pointSummaryData,
}: UserProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <StyledSpace direction="vertical" align="center">
      <TextBox typography="h5" color="primary" fontWeight="bold">
        {userInfoData.name} 님
      </TextBox>
      <TextBox typography="h3" color="black900" fontWeight="bold">
        {numberFormat(pointSummaryData.currentPoint)} P
      </TextBox>
      <StyledButton
        type="primary"
        size="large"
        onClick={showModal}
        data-testid={'charge-point-button'}
      >
        포인트 추가하기
      </StyledButton>
      <PointModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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
