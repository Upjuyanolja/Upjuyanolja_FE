import { message } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUrlState } from '@stores/point-charge-modal';
import { useRecoilValue } from 'recoil';
export const TossFail = () => {
  const navigation = useNavigate();
  const currentUrl = useRecoilValue(currentUrlState);

  useEffect(() => {
    message.error({
      content: '결제요청에 실패했습니다.',
      duration: 2,
    });
    navigation(currentUrl);
  }, []);

  return <div></div>;
};
