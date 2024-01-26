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
import { MOBILE_BREAKPOINTS } from '@/constants/mobile';

export const SideBar = () => {
  const {
    pointTotalData,
    isPointTotalError,
    accommodationListData,
    isAccommodationListError,
  } = useSideBar();
  const setIsSideBarOpen = useSetRecoilState(isSideBarOpenState);

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  if (isPointTotalError || isAccommodationListError) {
    return <></>;
  }

  return (
    <StyledContainer>
      <div>
        <StyledClosedButton onClick={closeSideBar}>
          <StyledIcon size={22} />
        </StyledClosedButton>
        <div>
          <UserProfile pointTotalData={pointTotalData} />
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
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: transform 0.3s ease-in;
`;

const StyledClosedButton = styled.button`
  width: 22px;
  height: 22px;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: none;
  margin: 4px 0 0 4px;
  @media (max-width: ${MOBILE_BREAKPOINTS}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledIcon = styled(IoCloseOutline)`
  color: ${colors.black900};
`;
