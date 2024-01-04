import { colors } from '@/constants/colors';
import UserProfile from './user-profile';
import AccommodationList from './accommodation-list';

function SideBar() {
  return (
    <div style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.1);' }}>
      <UserProfile />
      <div style={{ border: `1px solid ${colors.black500}` }}></div>
      <AccommodationList />
    </div>
  );
}

export default SideBar;
