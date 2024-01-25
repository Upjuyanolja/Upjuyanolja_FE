import { ROUTES } from '@/constants/routes';
import { getCookie } from '@hooks/sign-in/useSignIn';
import { Navigate } from 'react-router-dom';

export const MainRedirect = () => {
  const accommodationId = getCookie('accommodationId');
  const accessToken = getCookie('accessToken');
  if (accommodationId)
    return <Navigate to={`/${accommodationId}${ROUTES.MAIN}`} />;
  if (accessToken) return <Navigate to={`${ROUTES.INIT}`} />;
  return <Navigate to={`${ROUTES.SIGNIN}`} />;
};
