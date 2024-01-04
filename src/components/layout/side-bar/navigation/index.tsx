import { colors } from '@/constants/colors';
import { navigationMap } from '@/constants/navigation';
import TextBox from '@components/text';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledNavItemProps } from './type';

export const Navigation = () => {
  return (
    <nav>
      <StyledNavWrap>
        {Object.entries(navigationMap).map(([key, { label, link }]) => (
          <StyledNavItem
            key={key}
            borderColor={colors.black500}
            hoverColor={colors.lightHover}
            activeColor={colors.lightActive}
          >
            <Link to={link}>
              <TextBox typography="body2" color={'black900'} bold={true}>
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

const StyledNavItem = styled.li<StyledNavItemProps>`
  padding: 8px 0 8px 16px;
  border-bottom: 0.5px solid ${(props) => props.borderColor};
  a {
    display: block;
  }
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
  &:active {
    background-color: ${(props) => props.activeColor};
  }
`;
