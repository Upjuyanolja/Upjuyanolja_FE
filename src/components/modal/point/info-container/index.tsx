import { TextBox } from '@components/text-box';
import { Space } from 'antd';
import styled from 'styled-components';

export const InfoContainer = () => {
  return (
    <InfoPriceContainer direction="vertical" size={0}>
      <div>
        <TextBox typography="body3" color={'black900'} fontWeight={'400'}>
          충전하시는 포인트에 따른 결제 금액입니다.
        </TextBox>
      </div>

      <div>
        <TextBox typography="body3" color={'black900'} fontWeight={'400'}>
          *포인트 환산 기준: 결제 금액 = 포인트
        </TextBox>
        <TailBox></TailBox>
      </div>
    </InfoPriceContainer>
  );
};

const InfoPriceContainer = styled(Space)`
  position: absolute;
  bottom: 196px;
  right: 54px;

  width: 266px;

  border-radius: 2px;

  padding: 6px 8px;

  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);

  text-align: center;

  gap: 0px;
`;
const TailBox = styled('div')`
  width: 8px;
  height: 8px;

  position: absolute;
  bottom: -4px;
  left: 50%;

  transform: rotate(45deg);
  background-color: white;
`;
