import { colors } from '@/constants/colors';
import { Button } from 'antd';
import styled from 'styled-components';
import { CustomButtonProps } from './type';

export const CustomButton = ({ text, icon, onClick }: CustomButtonProps) => {
  return (
    <StyledButton icon={icon} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  background-color: ${colors.midGray} !important;
  color: ${colors.black700} !important;

  padding: 2px 4px;

  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  text-shadow: none;

  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);

  border: none;

  box-shadow: none;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  width: 60px;
  height: 28px;

  &:focus {
    border: none;
  }
`;
