import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const TossFail = () => {
  const navigation = useNavigate();
  useEffect(() => {
    navigation(-1);
  }, []);

  return <div></div>;
};
