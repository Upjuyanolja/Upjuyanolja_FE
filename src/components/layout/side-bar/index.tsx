import { AccommodationList } from './accommodation-list';
import { UserProfile } from './user-profile';
import { Navigation } from './navigation';
import { SignOutBtn } from './signout-btn';
import styled from 'styled-components';
import { useSideBar } from '@hooks/side-bar/useSideBar';

export const SideBar = () => {
  const { userInfoData, isUserInfoError } = useSideBar();

  if (!userInfoData) return <div>에러</div>;
  if (isUserInfoError) return <div>에러</div>;

  return (
    <Container>
      <div>
        <UserProfile userInfoData={userInfoData} />
        <AccommodationList />
        <Navigation />
      </div>
      <SignOutBtn />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  height: calc(100vh - 64px);
`;
