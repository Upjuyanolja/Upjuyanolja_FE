import { colors } from '@/constants/colors';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { TextBox } from '@components/text-box';
import { Layout, Space } from 'antd';

import styled from 'styled-components';

export const PointBox = () => {
  return (
    <Layout>
      <TextBox typography="h4" color="black900" fontWeight="bold">
        포인트 내역
      </TextBox>
      <StyledPointDetailWrap>
        <StyledDateWrap>
          <CaretLeftOutlined size={24} />
          <TextBox typography="h5" color="white" fontWeight="bold">
            2023 . 10월
          </TextBox>
          <CaretRightOutlined size={24} />
        </StyledDateWrap>
        <StyledPointUsingInfo>
          <StyledPointUsingInfoList direction="vertical">
            <div>
              <TextBox typography="body2" color="black800" fontWeight="bold">
                이달 충전 포인트
              </TextBox>
            </div>
            <div>
              <TextBox typography="h3" color="black800" fontWeight="bold">
                30,000 P
              </TextBox>
              <br />
              <TextBox typography="body3" color="black800" fontWeight="400">
                (30,000 원)
              </TextBox>
            </div>
          </StyledPointUsingInfoList>
          <StyledPointUsingInfoList direction="vertical">
            <div>
              <TextBox typography="body2" color="black800" fontWeight="bold">
                사용한 포인트
              </TextBox>
            </div>
            <div>
              <TextBox typography="h3" color="black800" fontWeight="bold">
                15,000 P
              </TextBox>
              <br />
              <TextBox typography="body3" color="black800" fontWeight="400">
                (15,000 원)
              </TextBox>
            </div>
          </StyledPointUsingInfoList>
          <StyledPointUsingInfoList direction="vertical">
            <div>
              <TextBox typography="body2" color="primary" fontWeight="bold">
                현재 보유 포인트
              </TextBox>
            </div>
            <div>
              <TextBox typography="h3" color="primary" fontWeight="bold">
                15,000 P
              </TextBox>
              <br />
              <TextBox typography="body3" color="primary" fontWeight="400">
                (15,000 원)
              </TextBox>
            </div>
          </StyledPointUsingInfoList>
        </StyledPointUsingInfo>
      </StyledPointDetailWrap>
    </Layout>
  );
};

const StyledPointDetailWrap = styled('div')`
  width: 100%;

  margin: 16px 0px;

  border: 2px solid ${colors.primary};
  border-radius: 8px;
`;
const StyledDateWrap = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${colors.primary};

  padding: 8px 0px;

  svg {
    margin: 0px 48px;

    color: ${colors.white};
  }
`;
const StyledPointUsingInfo = styled(Space)`
  padding: 24px 124px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledPointUsingInfoList = styled(Space)`
  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;
`;
