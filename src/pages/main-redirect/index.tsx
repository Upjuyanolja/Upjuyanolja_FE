import { ROUTES } from '@/constants/routes';
import { Navigate } from 'react-router-dom';

export const MainRedirect = () => {
  // 쿠키에 accommodationId가 있으먄 main으로 redirect 없으면 로그인 페이지로 redirect
  return <Navigate to={`/1${ROUTES.MAIN}`} />;
};
