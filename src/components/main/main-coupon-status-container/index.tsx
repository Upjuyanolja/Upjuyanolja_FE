import { colors } from '@/constants/colors';
import { Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { TextBox } from '@components/text-box';
import { MainCouponStatusContainerProps } from './type';

export const MainCouponStatusContainer = ({
  staticsData,
  navigateCoupon,
}: MainCouponStatusContainerProps) => {
  const items = [
    { name: '발행 쿠폰(A)', value: staticsData.total },
    { name: '사용 완료 쿠폰(B)', value: staticsData.used },
    { name: '현재 보유 쿠폰(A-B)', value: staticsData.stock },
  ];
  return (
    <StyledLayout color={colors.primary}>
      <StyledTitle color={colors.primary}>
        <StyledButton
          type="link"
          onClick={navigateCoupon}
          data-testid="navigate-coupon"
        >
          쿠폰 관리 바로 가기
          <RightOutlined color="white" />
        </StyledButton>
        <TextBox typography="body4" color="white">
          (2023.10월 기준)
        </TextBox>
      </StyledTitle>
      <StyledStatusLayout>
        {items.map((item, index) => (
          <StyledSpace key={index} color={colors.blue}>
            <TextBox typography="h5" fontWeight={700} color="blue">
              {item.name}
            </TextBox>
            <TextBox typography="h2" fontWeight={700} color="black900">
              {item.value}
            </TextBox>
          </StyledSpace>
        ))}
      </StyledStatusLayout>
    </StyledLayout>
  );
};

const StyledLayout = styled('div')`
  border: 2px solid ${(props) => props.color};
  border-radius: 8px;

  width: 100%;
  height: 171px;
`;

const StyledTitle = styled('div')`
  width: 100%;
  height: 24px;
  padding: 0 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${(props) => props.color};
`;

const StyledButton = styled(Button)`
  color: white;
  padding: 0;
  border: 0;
  font-size: 16px;
  font-weight: 700;

  &.ant-btn-link:hover {
    color: white;
  }
  &.ant-btn-link:active {
    color: white;
  }
  &.ant-btn-link:focus {
    color: white;
  }
`;

const StyledSpace = styled('div')`
  width: 231px;
  height: 112px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  border-right: 1px dashed ${(props) => props.color};
`;

const StyledStatusLayout = styled('div')`
  height: 147px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
