import { colors } from '@/constants/colors';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { TextBox } from '@components/text-box';
import { Button, ConfigProvider, DatePicker, Select, Tooltip } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import AdditionalBuyLogo from '@assets/image/additionalBuyLogo.png';
import moment from 'moment';
import styled from 'styled-components';
import { CouponHeaderProps } from './type';
import { DATE_FORMAT } from '@/constants/date';
import {
  COUPON_STATUS_DISABLE,
  COUPON_STATUS_ENABLE,
} from '@/constants/coupon';
import 'moment/locale/ko';
import locale from 'antd/es/locale/ko_KR';
export const CouponHeader = ({
  expiry,
  handleSelectStatus,
  handleDeleteButton,
  isModified,
  handleChangeDate,
  handleEditButton,
  handleModalOpen,
}: CouponHeaderProps) => {
  const couponStatusOption = [
    { value: COUPON_STATUS_ENABLE.value, label: COUPON_STATUS_ENABLE.label },
    { value: COUPON_STATUS_DISABLE.value, label: COUPON_STATUS_DISABLE.label },
  ];

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current < moment().startOf('day');
  };

  return (
    <ConfigProvider locale={locale}>
      <StyledLayout data-testid="coupon-header">
        <StyledContentLayout>
          <TextBox fontWeight={700} typography="h4">
            쿠폰 관리
          </TextBox>
          <StyledSaveButton
            type="primary"
            disabled={!isModified()}
            onClick={handleEditButton}
            data-testid="save-button"
          >
            <TextBox fontWeight={700} typography="h4">
              저장
            </TextBox>
          </StyledSaveButton>
        </StyledContentLayout>
        <StyledDateContainer>
          <StyledDateText>
            <TextBox typography="body1" fontWeight={700}>
              쿠폰 적용 기간
            </TextBox>
            <Tooltip
              title="고객은 적용기간 내의 숙박 건에만 쿠폰을 적용 할 수 있습니다."
              overlayInnerStyle={{
                width: '354px',
              }}
            >
              <InfoCircleOutlined width="18px" height="18px" color="blue" />
            </Tooltip>
          </StyledDateText>
          <DatePicker
            value={expiry === '' ? moment() : moment(expiry, DATE_FORMAT)}
            disabledDate={disabledDate}
            onChange={(_, date) => {
              handleChangeDate(date);
            }}
            allowClear={false}
            disabled={expiry === ''}
          />
          <TextBox typography="body1" fontWeight={700} color="black700">
            까지
          </TextBox>
        </StyledDateContainer>
        <StyledContentLayout>
          <Select
            defaultValue="상태 변경"
            options={couponStatusOption}
            onChange={handleSelectStatus}
            disabled={expiry === ''}
          />
          <StyledButtonContainer>
            <StyledDeleteButton
              onClick={handleDeleteButton}
              disabled={expiry === ''}
            >
              <DeleteOutlined width="20px" height="20px" />
              <TextBox typography="body2" fontWeight={700}>
                선택 삭제
              </TextBox>
            </StyledDeleteButton>
            <StyledPurchaseButton
              onClick={handleModalOpen}
              disabled={expiry === ''}
              type="primary"
            >
              <img width={15} height={11} src={AdditionalBuyLogo} />
              <TextBox typography="body2" fontWeight={700} color="white">
                추가 구매
              </TextBox>
            </StyledPurchaseButton>
          </StyledButtonContainer>
        </StyledContentLayout>
      </StyledLayout>
    </ConfigProvider>
  );
};

const StyledLayout = styled.div`
  margin: 32px 0;
  height: 154px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledContentLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledSaveButton = styled(Button)`
  width: 90px;
  height: 42px;
  border-radius: 4px;
`;

const StyledDateContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  padding: 6px 8px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  background: linear-gradient(268deg, #e0edff 1.74%, #fff 120.49%);
`;

const StyledDateText = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledDeleteButton = styled(Button)`
  background-color: ${colors.midGray};
  border: 1px solid ${colors.black300};
  color: ${colors.black700};
  padding: 2px 8px;
  border-radius: 2px;

  &.ant-btn:hover,
  &.ant-btn:focus,
  &.ant-btn:active {
    background-color: ${colors.midGray};
    color: ${colors.black800};
    border: 1px solid #e5e9ed;
  }

  &.ant-click-animating-node {
    display: none;
  }
`;
const StyledPurchaseButton = styled(Button)`
  background-color: ${colors.dark};
  border-radius: 2px;
  padding: 4px 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &.ant-btn:hover {
    background-color: ${colors.darkHover};
    color: white;
  }

  &.ant-btn:active {
    background-color: ${colors.darkActive};
    color: white;
  }

  &.ant-btn:focus {
    background-color: ${colors.darkHover};
    color: white;
  }

  &.ant-click-animating-node {
    display: none;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;
