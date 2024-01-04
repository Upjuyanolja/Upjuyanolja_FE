import { colors } from '@/constants/colors';
import { AccommodationList } from './accommodation-list';
import { UserProfile } from './user-profile';
import { Navigation } from './navigation';
import { SignOutBtn } from './signout-btn';

export const SideBar = () => {
  return (
    <div style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.1);' }}>
      <UserProfile />
      <div style={{ border: `1px solid ${colors.black500}` }}></div>
      <AccommodationList />
      <Navigation />
      <SignOutBtn />
    </div>
  );
};
