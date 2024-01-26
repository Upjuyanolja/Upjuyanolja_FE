import { colors } from '@/constants/colors';
import { Button } from 'antd';
import styled from 'styled-components';
import { CustomButtonProps } from './type';

export const CustomButton = ({ text, icon, onClick }: CustomButtonProps) => {
  return (
    <StyledButton
      icon={icon}
      onClick={onClick}
      data-testid={text === '삭제' ? 'delete-button' : 'edit-button'}
    >
      {text}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  background-color: ${colors.midGray} !important;
  color: ${colors.black700} !important;

  padding: 2px 4px;

  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  text-shadow: none;

  box-shadow: none;

  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  width: 57px;
  height: 25px;

  &:focus {
    border: none;
  }
`;
