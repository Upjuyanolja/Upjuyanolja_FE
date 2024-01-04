import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const handleChangeUrl = (url: string) => {
    navigate(url);
  };

  return {
    handleChangeUrl,
  };
};
