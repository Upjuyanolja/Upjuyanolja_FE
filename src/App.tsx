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
import RoomUpdate from './pages/room-update';
import { RootLayout } from './layout';
import './App.less';
import { RoomLayout } from '@components/room/room-layout';
import { getCookie } from '@hooks/sign-in/useSignIn';
import { InitLayout } from '@components/layout/init-layout/InitLayout';
import { MainRedirect } from '@pages/main-redirect';
import { TossSuccess } from '@pages/toss-success';
import { TossFail } from '@pages/toss-fail';
import { UserGuide } from '@pages/user-guide';
import { useMediaQuery } from 'react-responsive';
import { Mobile } from '@pages/mobile';

function App() {
  const accessToken = getCookie('accessToken');
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  if (isMobile) return <Mobile />;
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
        <Route
          path={ROUTES.TOSS_SUCCESS}
          element={
            accessToken ? <Navigate to={ROUTES.SIGNIN} /> : <TossSuccess />
          }
        />
        <Route
          path={ROUTES.TOSS_FAIL}
          element={accessToken ? <Navigate to={ROUTES.SIGNIN} /> : <TossFail />}
        />
        <Route
          path={ROUTES.INIT}
          element={accessToken ? <Navigate to={ROUTES.SIGNIN} /> : <Init />}
        />
        <Route
          element={
            accessToken ? <Navigate to={ROUTES.SIGNIN} /> : <InitLayout />
          }
        >
          <Route
            path={ROUTES.INIT_ACCOMMODATION_REGISTRATION}
            element={
              accessToken ? (
                <Navigate to={ROUTES.SIGNIN} />
              ) : (
                <InitAccommodationRegistration />
              )
            }
          />
          <Route
            path={ROUTES.INIT_ROOM_REGISTRATION}
            element={
              accessToken ? (
                <Navigate to={ROUTES.SIGNIN} />
              ) : (
                <InitRoomRegistration />
              )
            }
          />
          <Route
            path={ROUTES.INIT_INFO_CONFIRMATION}
            element={
              accessToken ? (
                <Navigate to={ROUTES.SIGNIN} />
              ) : (
                <InitInfoConfirmation />
              )
            }
          />
        </Route>
        {/* 레이아웃 적용 페이지  */}
        <Route
          element={
            accessToken ? <Navigate to={ROUTES.SIGNIN} /> : <RootLayout />
          }
        >
          <Route
            path={ROUTES.POINT_DETAIL}
            element={
              accessToken ? <Navigate to={ROUTES.SIGNIN} /> : <PointDetail />
            }
          />
          <Route
            path={`/:accommodationId${ROUTES.COUPON}`}
            element={accessToken ? <Navigate to={ROUTES.SIGNIN} /> : <Coupon />}
          />
          <Route
            path={'/'}
            element={
              accessToken ? <Navigate to={ROUTES.SIGNIN} /> : <MainRedirect />
            }
          />
          <Route
            path={`/:accommodationId${ROUTES.COUPON_REGISTRATION}`}
            element={
              accessToken ? (
                <Navigate to={ROUTES.SIGNIN} />
              ) : (
                <CouponRegistration />
              )
            }
          />

          <Route
            path={`/:accommodationId${ROUTES.MAIN}`}
            element={accessToken ? <Navigate to={ROUTES.SIGNIN} /> : <Main />}
          />
          <Route
            path={`/:accommodationId${ROUTES.ROOM}`}
            element={accessToken ? <Navigate to={ROUTES.SIGNIN} /> : <Room />}
          />
          <Route element={<RoomLayout />}>
            <Route
              path={`/:accommodationId${ROUTES.ROOM_REGISTRATION}`}
              element={
                accessToken ? (
                  <Navigate to={ROUTES.SIGNIN} />
                ) : (
                  <RoomRegistration />
                )
              }
            />
          </Route>
          <Route element={<RoomLayout />}>
            <Route
              path={`/:accommodationId${ROUTES.ROOM_UPDATE}`}
              element={
                accessToken ? <Navigate to={ROUTES.SIGNIN} /> : <RoomUpdate />
              }
            />
          </Route>
          <Route
            path={ROUTES.USER_GUIDE}
            element={
              accessToken ? <Navigate to={ROUTES.SIGNIN} /> : <UserGuide />
            }
          />
        </Route>
        <Route
          path={'/*'}
          element={
            accessToken ? (
              <Navigate to={ROUTES.SIGNIN} />
            ) : (
              <RootLayout isError={true} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
