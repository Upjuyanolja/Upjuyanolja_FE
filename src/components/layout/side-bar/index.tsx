import { AccommodationList } from './accommodation-list';
import { UserProfile } from './user-profile';
import { Navigation } from './navigation';
import { SignOutBtn } from './signout-btn';
import styled from 'styled-components';
import { useSideBar } from '@hooks/side-bar/useSideBar';
import { IoCloseOutline } from 'react-icons/io5';
import { colors } from '@/constants/colors';
import { useSetRecoilState } from 'recoil';
import { isSideBarOpenState } from '@stores/layout';

export const SideBar = () => {
  const { pointSummaryData, accommodationListData } = useSideBar();
  const setIsSideBarOpen = useSetRecoilState(isSideBarOpenState);

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <StyledContainer>
      <div>
        <StyledClosedButton onClick={closeSideBar}>
          <StyledIcon width={16} height={16} />
        </StyledClosedButton>
        <div>
          <UserProfile pointSummaryData={pointSummaryData} />
          <AccommodationList accommodationListData={accommodationListData} />
          <Navigation />
        </div>
      </div>
      <SignOutBtn />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  overflow-y: auto;
  transition: transform 0.3s ease-in;
`;

const StyledClosedButton = styled.button`
  width: 16px;
  padding: 4px 4px 0 4px;
  height: 22px;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: none;
  @media (max-width: 1280px) {
    display: flex;
  }
`;

const StyledIcon = styled(IoCloseOutline)`
  width: 16px;
  height: 16px;
  font-size: 16px;
  color: ${colors.black900};
`;
