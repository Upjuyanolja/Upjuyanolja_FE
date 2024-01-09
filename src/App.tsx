import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { SignIn } from './pages/sign-in';
import { SignInAgreement } from './pages/sign-in-agreement';
import { SignUp } from './pages/sign-up';
import { SignUpSuccess } from './pages/sign-up-success';
import { PointDetail } from './pages/point-detail';
import { Init } from './pages/init';
import { InitAccommodationRegistration } from './pages/init-accommodation-registration';
import { InitRoomRegistration } from './pages/init-room-registration';
import { InitInfoConfirmation } from './pages/init-info-confirmation';
import { Coupon } from './pages/coupon';
import { CouponRegistration } from './pages/coupon-registration';
import { Main } from './pages/main';
import Room from './pages/room-management';
import RoomRegistration from './pages/room-registration';
import { RoomUpdate } from './pages/room-update';
import { RootLayout } from './layout';
import './App.less';
import { InitLayout } from '@components/init/init-button/InitLayout';
import { getCookie } from '@hooks/sign-in/useSignIn';
function App() {
  const accessToken = getCookie('accessToken');
  return (
    <Router>
      <Routes>
        {/* 레이아웃 미적용 페이지 */}
        <Route
          path={ROUTES.SIGNIN}
          element={accessToken ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path={ROUTES.SIGNIN_AGREEMENT}
          element={accessToken ? <Navigate to="/" /> : <SignInAgreement />}
        />
        <Route
          path={ROUTES.SIGNUP}
          element={accessToken ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path={ROUTES.SIGNUP_SUCCESS}
          element={accessToken ? <Navigate to="/" /> : <SignUpSuccess />}
        />
        <Route path={ROUTES.INIT} element={<Init />} />
        <Route element={<InitLayout />}>
          <Route
            path={ROUTES.INIT_ACCOMMODATION_REGISTRATION}
            element={<InitAccommodationRegistration />}
          />
          <Route
            path={ROUTES.INIT_ROOM_REGISTRATION}
            element={<InitRoomRegistration />}
          />
          <Route
            path={ROUTES.INIT_INFO_CONFIRMATION}
            element={<InitInfoConfirmation />}
          />
        </Route>
        {/* 레이아웃 적용 페이지  */}
        <Route element={<RootLayout />}>
          <Route path={ROUTES.POINT_DETAIL} element={<PointDetail />} />
          <Route path={ROUTES.COUPON} element={<Coupon />} />
          <Route
            path={ROUTES.COUPON_REGISTRATION}
            element={<CouponRegistration />}
          />
          <Route path={ROUTES.MAIN} element={<Main />} />
          <Route path={ROUTES.ROOM} element={<Room />} />
          <Route
            path={ROUTES.ROOM_REGISTRATION}
            element={<RoomRegistration />}
          />
          <Route path={ROUTES.ROOM_UPDATE} element={<RoomUpdate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
