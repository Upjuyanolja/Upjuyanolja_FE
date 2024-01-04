import { AccommodationList } from './accommodation-list';
import { UserProfile } from './user-profile';
import { Navigation } from './navigation';
import { SignOutBtn } from './signout-btn';
import styled from 'styled-components';

export const SideBar = () => {
  return (
    <Container>
      <div>
        <UserProfile />
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
  box-shadow: '0 0 5px rgba(0, 0, 0, 0.1);';
  height: calc(100vh - 64px);
`;
