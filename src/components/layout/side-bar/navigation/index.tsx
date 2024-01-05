import { colors } from '@/constants/colors';
import { navigationMap } from '@/constants/navigation';
import { TextBox } from '@components/text-box';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Navigation = () => {
  return (
    <nav>
      <StyledNavWrap>
        {Object.entries(navigationMap).map(([key, { label, link }]) => (
          <StyledNavItem key={key}>
            <Link to={link}>
<<<<<<< HEAD
              <TextBox
                typography="body2"
                color="black900"
                fontWeight="bold"
                cursor="pointer"
              >
=======
              <TextBox typography="body2" color={'black900'} bold={true}>
>>>>>>> ab3c56ccfe49aa6a9807d5e234f662d68a045871
                {label}
              </TextBox>
            </Link>
          </StyledNavItem>
        ))}
      </StyledNavWrap>
    </nav>
  );
};

const StyledNavWrap = styled.ul`
  padding: 0;
  margin-bottom: 0;
`;

const StyledNavItem = styled.li`
  padding: 8px 0 8px 16px;
  border-bottom: 0.5px solid ${colors.black500};
  a {
    display: block;
  }
  &:hover {
    background-color: ${colors.lightHover};
  }
  &:active {
    background-color: ${colors.lightActive};
  }
`;
