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
    { id: 1, name: '발행 쿠폰(A)', value: staticsData.total },
    { id: 2, name: '사용 완료 쿠폰(B)', value: staticsData.used },
    { id: 3, name: '현재 보유 쿠폰(A-B)', value: staticsData.stock },
  ];

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;
  return (
    <StyledLayout>
      <StyledTitle>
        <StyledButton
          type="link"
          onClick={navigateCoupon}
          data-testid="navigate-coupon"
        >
          쿠폰 관리 바로 가기
          <RightOutlined color="white" />
        </StyledButton>
        <TextBox typography="body4" color="white">
          ({currentYear}.{currentMonth}월 기준)
        </TextBox>
      </StyledTitle>
      <StyledStatusLayout>
        {items.map((item) => (
          <StyledSpace key={item.id} id={item.id}>
            <TextBox typography="h5" fontWeight={700} color="blue">
              {item.name}
            </TextBox>
            <TextBox
              typography="h2"
              fontWeight={700}
              color="black900"
              data-testid={item.name}
            >
              {item.value}
            </TextBox>
          </StyledSpace>
        ))}
      </StyledStatusLayout>
    </StyledLayout>
  );
};

const StyledLayout = styled('div')`
  border: 2px solid ${colors.primary};
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

  background-color: ${colors.primary};
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

const StyledSpace = styled('div')<{ id: number }>`
  width: 231px;
  height: 112px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  ${(props) => props.id !== 3 && `border-right: 1px dashed ${colors.blue};`}
`;

const StyledStatusLayout = styled('div')`
  height: 147px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
