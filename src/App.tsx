import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
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
import Room from './pages/room';
import { RoomRegistration } from './pages/room/room-registration';
import { RoomUpdate } from './pages/room/room-update';
import { RootLayout } from './layout';
import './App.less';

function App() {
  return (
    <Router>
      <Routes>
        {/* 레이아웃 미적용 페이지 */}
        <Route path={ROUTES.SIGNIN} element={<SignIn />} />
        <Route path={ROUTES.SIGNIN_AGREEMENT} element={<SignInAgreement />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.SIGNUP_SUCCESS} element={<SignUpSuccess />} />
        <Route path={ROUTES.INIT} element={<Init />} />
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
